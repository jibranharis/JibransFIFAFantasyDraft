import { Router } from 'express';
import { matches, predictions, isMatchLocked } from '../db.js';

const router = Router();

// Helper: format a match record for API response
function formatMatch(match, prediction) {
  return {
    id: match.id,
    homeTeam: match.home_team,
    awayTeam: match.away_team,
    homeFlag: match.home_flag,
    awayFlag: match.away_flag,
    stage: match.stage,
    matchDay: match.match_day,
    scheduledAt: match.scheduled_at,
    status: match.status,
    homeScore: match.home_score,
    awayScore: match.away_score,
    groupName: match.group_name,
    userPrediction: prediction
      ? { homeScore: prediction.home_score, awayScore: prediction.away_score }
      : null,
    isLocked: isMatchLocked(match),
  };
}

// GET /matches
router.get('/', (req, res) => {
  const allMatches = matches.all().sort((a, b) => {
    if (a.scheduled_at < b.scheduled_at) return -1;
    if (a.scheduled_at > b.scheduled_at) return 1;
    return 0;
  });

  const userId = req.user?.id ?? req.session?.userId ?? null;

  if (!userId) {
    const formatted = allMatches.map((m) => formatMatch(m, null));
    return res.json({ matches: formatted });
  }

  // Build prediction map for current user
  const userPredictions = predictions.find((p) => p.user_id === userId);
  const predMap = {};
  for (const p of userPredictions) {
    predMap[p.match_id] = p;
  }

  const formatted = allMatches.map((m) => formatMatch(m, predMap[m.id] ?? null));
  return res.json({ matches: formatted });
});

export default router;
