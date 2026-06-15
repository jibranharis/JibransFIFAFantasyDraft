import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { matches, predictions, rounds, arenas, arenaMembers, users, getRoundSlug } from '../db.js';

const router = Router();

// ── Admin guard middleware ─────────────────────────────────────────────────────
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  if (req.user.is_admin !== true) {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Determine the outcome of a match: 'home', 'away', or 'draw'.
 */
function outcome(home, away) {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
}

/**
 * Calculate points for a single prediction against actual scores.
 * Exact score = 3 pts, correct outcome = 1 pt, wrong = 0.
 */
function calcPoints(predHome, predAway, actualHome, actualAway) {
  if (predHome === actualHome && predAway === actualAway) return 3;
  if (outcome(predHome, predAway) === outcome(actualHome, actualAway)) return 1;
  return 0;
}

// ── PUT /admin/matches/:id/status ─────────────────────────────────────────────
router.put('/matches/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['scheduled', 'live', 'completed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${validStatuses.join(', ')}` });
  }

  const match = matches.get((m) => m.id === req.params.id);
  if (!match) return res.status(404).json({ error: 'Match not found.' });

  const updated = matches.update((m) => m.id === match.id, { status });

  return res.json({ match: updated[0] });
});

// ── PUT /admin/matches/:id/result ─────────────────────────────────────────────
router.put('/matches/:id/result', (req, res) => {
  const { homeScore, awayScore } = req.body;

  if (homeScore == null || awayScore == null) {
    return res.status(400).json({ error: 'homeScore and awayScore are required.' });
  }

  const match = matches.get((m) => m.id === req.params.id);
  if (!match) return res.status(404).json({ error: 'Match not found.' });

  const actualHome = Number(homeScore);
  const actualAway = Number(awayScore);

  // Update match result and mark completed
  matches.update((m) => m.id === match.id, {
    home_score: actualHome,
    away_score: actualAway,
    status: 'completed',
  });

  // Recalculate points for all predictions on this match
  const matchPredictions = predictions.find((p) => p.match_id === match.id);
  let predictionsUpdated = 0;

  for (const pred of matchPredictions) {
    const pts = calcPoints(pred.home_score, pred.away_score, actualHome, actualAway);
    predictions.update((p) => p.id === pred.id, { points: pts });
    predictionsUpdated++;
  }

  const updatedMatch = matches.get((m) => m.id === match.id);
  return res.json({
    match: updatedMatch,
    predictionsUpdated,
  });
});

// ── GET /admin/rounds ─────────────────────────────────────────────────────────
router.get('/rounds', (req, res) => {
  const allRounds = rounds.all().sort((a, b) => a.id - b.id);
  const allMatches = matches.all();

  // Group matches by round slug
  const matchesByRound = {};
  for (const m of allMatches) {
    const slug = getRoundSlug(m);
    if (!matchesByRound[slug]) matchesByRound[slug] = [];
    matchesByRound[slug].push(m);
  }

  const formatted = allRounds.map((r) => {
    const roundMatches = matchesByRound[r.slug] ?? [];
    const total = roundMatches.length;
    const completedCount = roundMatches.filter((m) => m.status === 'completed').length;
    const liveCount = roundMatches.filter((m) => m.status === 'live').length;
    const scheduledCount = roundMatches.filter((m) => m.status === 'scheduled').length;

    return {
      slug: r.slug,
      name: r.name,
      locksAt: r.locks_at ?? null,
      isLocked: r.is_locked === true || r.is_locked === 1,
      matchCount: total,
      completedCount,
      liveCount,
      scheduledCount,
    };
  });

  return res.json({ rounds: formatted });
});

// ── POST /admin/arenas ────────────────────────────────────────────────────────
router.post('/arenas', (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Arena name is required.' });
  }

  // Generate an 8-char uppercase alphanumeric invite code
  const inviteCode =
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    Math.random().toString(36).substring(2, 6).toUpperCase();

  const arenaId = uuidv4();

  const arena = arenas.insert({
    id: arenaId,
    name: name.trim(),
    invite_code: inviteCode,
    owner_id: req.user.id,
    created_at: new Date().toISOString(),
  });

  // Auto-add admin as a member
  arenaMembers.insert({
    id: uuidv4(),
    arena_id: arenaId,
    user_id: req.user.id,
    joined_at: new Date().toISOString(),
  });

  return res.status(201).json({
    arena: {
      id: arena.id,
      name: arena.name,
      inviteCode: arena.invite_code,
      ownerId: arena.owner_id,
      createdAt: arena.created_at,
    },
  });
});
// ── GET /admin/predictions ───────────────────────────────────────────────────
router.get('/predictions', (req, res) => {
  const allUsers = users.all();
  const allMatches = matches.all();
  const allPredictions = predictions.all();

  // Map matches for quick lookup
  const matchMap = {};
  for (const m of allMatches) {
    matchMap[m.id] = { homeTeam: m.home_team, awayTeam: m.away_team, matchDay: m.match_day, stage: m.stage, status: m.status };
  }

  // Map predictions by user
  const userPreds = {};
  for (const u of allUsers) {
    userPreds[u.id] = {
      userId: u.id,
      username: u.display_name,
      email: u.email,
      predictions: []
    };
  }

  for (const p of allPredictions) {
    if (userPreds[p.user_id]) {
      userPreds[p.user_id].predictions.push({
        id: p.id,
        matchId: p.match_id,
        homeScore: p.home_score,
        awayScore: p.away_score,
        points: p.points,
        match: matchMap[p.match_id]
      });
    }
  }

  // Only return users who have made at least one prediction
  const activeUsers = Object.values(userPreds).filter(u => u.predictions.length > 0);

  return res.json({ users: activeUsers });
});

export default router;
