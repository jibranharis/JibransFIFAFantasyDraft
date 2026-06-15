import { Router } from 'express';
import { matches, predictions, isMatchLocked } from '../db.js';

const router = Router();

// Generate next autoincrement ID for predictions
function nextPredictionId() {
  const all = predictions.all();
  return Math.max(0, ...all.map((p) => p.id)) + 1;
}

// Upsert a single prediction; returns the prediction record
function upsertPrediction(userId, matchId, homeScore, awayScore) {
  const existing = predictions.get((p) => p.user_id === userId && p.match_id === matchId);

  if (existing) {
    const updated = predictions.update(
      (p) => p.id === existing.id,
      { home_score: homeScore, away_score: awayScore, updated_at: new Date().toISOString() }
    );
    return updated[0];
  }

  const newPred = predictions.insert({
    id: nextPredictionId(),
    user_id: userId,
    match_id: matchId,
    home_score: homeScore,
    away_score: awayScore,
    points: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  return newPred;
}

// POST /predictions
router.post('/', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'You must be logged in to submit a prediction.' });
  }

  const { matchId, homeScore, awayScore } = req.body;

  if (matchId == null || homeScore == null || awayScore == null) {
    return res.status(400).json({ error: 'matchId, homeScore, and awayScore are required.' });
  }

  const match = matches.get((m) => m.id === matchId);
  if (!match) {
    return res.status(404).json({ error: 'Match not found.' });
  }

  const isAdmin = req.user?.is_admin === true;

  if (!isAdmin && isMatchLocked(match)) {
    return res.status(400).json({ error: 'This match is locked. Predictions are closed.' });
  }

  const prediction = upsertPrediction(
    req.user.id,
    matchId,
    Number(homeScore),
    Number(awayScore)
  );

  return res.json({
    prediction: {
      id: prediction.id,
      matchId: prediction.match_id,
      homeScore: prediction.home_score,
      awayScore: prediction.away_score,
    },
  });
});

// POST /predictions/batch
router.post('/batch', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'You must be logged in to submit predictions.' });
  }

  const { predictions: preds } = req.body;

  if (!Array.isArray(preds) || preds.length === 0) {
    return res.status(400).json({ error: 'predictions must be a non-empty array.' });
  }

  const isAdmin = req.user?.is_admin === true;

  let saved = 0;
  for (const { matchId, homeScore, awayScore } of preds) {
    if (matchId == null || homeScore == null || awayScore == null) continue;

    const match = matches.get((m) => m.id === matchId);
    if (!match) continue;

    // Per-match lock check for non-admins
    if (!isAdmin && isMatchLocked(match)) continue;

    upsertPrediction(req.user.id, matchId, Number(homeScore), Number(awayScore));
    saved++;
  }

  return res.json({ saved });
});

export default router;
