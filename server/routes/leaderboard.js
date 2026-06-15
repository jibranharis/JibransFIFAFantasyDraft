import { Router } from 'express';
import { users, predictions } from '../db.js';

const router = Router();

// GET /leaderboard
router.get('/', (req, res) => {
  const allUsers = users.all();
  // Only include predictions where points have been awarded
  const scoredPredictions = predictions.find((p) => p.points !== null && p.points !== undefined);

  // Build a map: userId -> { totalPoints, exactScores, correctOutcomes, predictionsCount }
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

  // Sort: totalPoints desc, exactScores desc, username asc
  const sorted = Object.values(statsMap).sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.exactScores !== a.exactScores) return b.exactScores - a.exactScores;
    return a.username.localeCompare(b.username);
  });

  // Assign ranks with tie support
  let rank = 1;
  const leaderboard = sorted.map((row, idx) => {
    if (idx > 0 && row.totalPoints < sorted[idx - 1].totalPoints) {
      rank = idx + 1;
    }
    return { rank, ...row };
  });

  return res.json({ leaderboard });
});

export default router;
