import { Router } from 'express';
import { rounds, matches, getRoundSlug, isMatchLocked } from '../db.js';

const router = Router();

// GET /rounds
router.get('/', (req, res) => {
  const allRounds = rounds.all().sort((a, b) => a.id - b.id);
  const allMatches = matches.all();

  // Build a map: roundSlug -> array of matches
  const matchesByRound = {};
  for (const m of allMatches) {
    const slug = getRoundSlug(m);
    if (!matchesByRound[slug]) matchesByRound[slug] = [];
    matchesByRound[slug].push(m);
  }

  const formatted = allRounds.map((r) => {
    const roundMatches = matchesByRound[r.slug] ?? [];
    const matchCount = roundMatches.length;

    // isLocked = DB flag is set OR any match in the round is within lock window
    const hasLockedMatch = roundMatches.some((m) => isMatchLocked(m));
    const isLocked = r.is_locked === true || r.is_locked === 1 || hasLockedMatch;

    return {
      slug: r.slug,
      name: r.name,
      locksAt: r.locks_at ?? null,
      isLocked,
      matchCount,
    };
  });

  return res.json({ rounds: formatted });
});

export default router;
