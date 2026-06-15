import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { arenas, arenaMembers, users, predictions, matches } from '../db.js';

const router = Router();

// Auth guard helper
function requireAuth(req, res) {
  if (!req.user) {
    res.status(401).json({ error: 'You must be logged in.' });
    return false;
  }
  return true;
}

// Get membership record for a user in an arena
function getMembership(arenaId, userId) {
  if (!userId) return null;
  return arenaMembers.get((m) => m.arena_id === arenaId && m.user_id === userId) ?? null;
}

// Format an arena record
function formatArena(arena, membership, memberCount) {
  const isAdmin = false; // caller passes membership explicitly
  const isMember = !!membership;
  return {
    id: arena.id,
    name: arena.name,
    isMember,
    memberCount: memberCount ?? arenaMembers.count((m) => m.arena_id === arena.id),
    inviteCode: isMember ? arena.invite_code : undefined,
    createdAt: arena.created_at,
  };
}

// GET /arenas — list all arenas
router.get('/', (req, res) => {
  const userId = req.user?.id ?? req.session?.userId ?? null;
  const isAdmin = req.user?.is_admin === true;

  const allArenas = arenas.all().sort((a, b) => a.name.localeCompare(b.name));

  const formatted = allArenas.map((arena) => {
    const membership = getMembership(arena.id, userId);
    const memberCount = arenaMembers.count((m) => m.arena_id === arena.id);
    const isMember = !!membership;
    return {
      id: arena.id,
      name: arena.name,
      isMember,
      memberCount,
      inviteCode: isMember || isAdmin ? arena.invite_code : undefined,
      createdAt: arena.created_at,
    };
  });

  return res.json({ arenas: formatted });
});

// GET /arenas/:id — arena details
router.get('/:id', (req, res) => {
  const arena = arenas.get((a) => a.id === req.params.id);
  if (!arena) return res.status(404).json({ error: 'Arena not found.' });

  const userId = req.user?.id ?? req.session?.userId ?? null;
  const isAdmin = req.user?.is_admin === true;
  const membership = getMembership(arena.id, userId);
  const memberCount = arenaMembers.count((m) => m.arena_id === arena.id);
  const isMember = !!membership;

  return res.json({
    arena: {
      id: arena.id,
      name: arena.name,
      isMember,
      memberCount,
      inviteCode: isMember || isAdmin ? arena.invite_code : undefined,
      createdAt: arena.created_at,
    },
  });
});

// GET /arenas/:id/leaderboard — arena-scoped leaderboard
router.get('/:id/leaderboard', (req, res) => {
  const arena = arenas.get((a) => a.id === req.params.id);
  if (!arena) return res.status(404).json({ error: 'Arena not found.' });

  // Get all member user IDs for this arena
  const members = arenaMembers.find((m) => m.arena_id === arena.id);
  const memberUserIds = new Set(members.map((m) => m.user_id));

  const allUsers = users.find((u) => memberUserIds.has(u.id));
  const scoredPredictions = predictions.find(
    (p) => memberUserIds.has(p.user_id) && p.points !== null && p.points !== undefined
  );

  // Build stats map
  const statsMap = {};
  for (const u of allUsers) {
    statsMap[u.id] = {
      userId: u.id,
      username: u.display_name,
      totalPoints: 0,
      exactScores: 0,
      correctOutcomes: 0,
      predictionsCount: 0,
    };
  }

  for (const p of scoredPredictions) {
    const entry = statsMap[p.user_id];
    if (!entry) continue;
    entry.totalPoints += p.points;
    entry.predictionsCount += 1;
    if (p.points === 3) entry.exactScores += 1;
    if (p.points === 1) entry.correctOutcomes += 1;
  }

  const sorted = Object.values(statsMap).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
    return a.username.localeCompare(b.username);
  });

  let rank = 1;
  const leaderboard = sorted.map((row, idx) => {
    if (idx > 0 && row.totalPoints < sorted[idx - 1].totalPoints) {
      rank = idx + 1;
    }
    return { rank, ...row };
  });

  return res.json({ leaderboard });
});

// GET /arenas/:arenaId/members/:userId/predictions
// Returns a member's predictions with match context (only for arena members or admins)
router.get('/:arenaId/members/:userId/predictions', (req, res) => {
  const { arenaId, userId } = req.params;

  const arena = arenas.get((a) => a.id === arenaId);
  if (!arena) return res.status(404).json({ error: 'Arena not found.' });

  // Access control: must be an arena member or admin
  const requesterId = req.user?.id ?? req.session?.userId ?? null;
  const isAdmin = req.user?.is_admin === true;
  const requesterMembership = getMembership(arenaId, requesterId);

  if (!isAdmin && !requesterMembership) {
    return res.status(403).json({ error: 'You must be a member of this arena to view predictions.' });
  }

  // Target user must be a member
  const targetMembership = getMembership(arenaId, userId);
  if (!targetMembership) {
    return res.status(404).json({ error: 'User is not a member of this arena.' });
  }

  const targetUser = users.get((u) => u.id === userId);
  if (!targetUser) return res.status(404).json({ error: 'User not found.' });

  const allMatches = matches.all();
  const matchMap = {};
  for (const m of allMatches) {
    matchMap[m.id] = m;
  }

  const userPredictions = predictions
    .find((p) => p.user_id === userId)
    .map((p) => {
      const m = matchMap[p.match_id];
      return {
        id: p.id,
        matchId: p.match_id,
        homeScore: p.home_score,
        awayScore: p.away_score,
        points: p.points,
        homeTeam: m?.home_team ?? null,
        awayTeam: m?.away_team ?? null,
        scheduledAt: m?.scheduled_at ?? null,
        status: m?.status ?? null,
        actualHomeScore: m?.home_score ?? null,
        actualAwayScore: m?.away_score ?? null,
      };
    })
    .sort((a, b) => {
      if (a.scheduledAt < b.scheduledAt) return -1;
      if (a.scheduledAt > b.scheduledAt) return 1;
      return 0;
    });

  return res.json({
    user: { id: targetUser.id, displayName: targetUser.display_name },
    predictions: userPredictions,
  });
});

// POST /arenas/join/:code — join arena by invite code
router.post('/join/:code', (req, res) => {
  if (!requireAuth(req, res)) return;

  const arena = arenas.get((a) => a.invite_code === req.params.code);
  if (!arena) return res.status(404).json({ error: 'Invalid invite code.' });

  const existing = getMembership(arena.id, req.user.id);
  if (existing) {
    return res.status(409).json({ error: 'You are already a member of this arena.' });
  }

  arenaMembers.insert({
    id: uuidv4(),
    arena_id: arena.id,
    user_id: req.user.id,
    joined_at: new Date().toISOString(),
  });

  const memberCount = arenaMembers.count((m) => m.arena_id === arena.id);

  return res.json({
    arena: {
      id: arena.id,
      name: arena.name,
      isMember: true,
      memberCount,
      inviteCode: arena.invite_code,
      createdAt: arena.created_at,
    },
  });
});

// POST /arenas/:id/regenerate-invite — admin only, generate new invite code
router.post('/:id/regenerate-invite', (req, res) => {
  if (!requireAuth(req, res)) return;

  const isAdmin = req.user?.is_admin === true;
  if (!isAdmin) {
    return res.status(403).json({ error: 'Only admins can regenerate invite codes.' });
  }

  const arena = arenas.get((a) => a.id === req.params.id);
  if (!arena) return res.status(404).json({ error: 'Arena not found.' });

  // Generate new 8-char uppercase code
  const newCode =
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    Math.random().toString(36).substring(2, 6).toUpperCase();

  arenas.update((a) => a.id === arena.id, { invite_code: newCode });

  return res.json({ inviteCode: newCode });
});

export default router;
