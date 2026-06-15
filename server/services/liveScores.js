import { matches, predictions } from '../db.js';

function outcome(home, away) {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
}

function calcPoints(predHome, predAway, actualHome, actualAway) {
  if (predHome === actualHome && predAway === actualAway) return 3;
  if (outcome(predHome, predAway) === outcome(actualHome, actualAway)) return 1;
  return 0;
}

// API-Football / API-Sports key (World Cup = league 1 in api-sports)
const API_KEY = process.env.API_FOOTBALL_KEY || '6aa4c9a2-07dc-4cae-8b78-836fc7a71341';
const WORLD_CUP_LEAGUE_ID = 1; // FIFA World Cup on api-sports.io
const SEASON = 2026;

export async function updateLiveScores() {
  console.log('[LiveScores] Syncing scores from API-Sports...');

  try {
    // Fetch live and recently finished World Cup 2026 fixtures
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}&season=${SEASON}`,
      {
        method: 'GET',
        headers: { 'x-apisports-key': API_KEY }
      }
    );

    if (!response.ok) {
      const txt = await response.text();
      console.warn(`[LiveScores] API responded ${response.status}: ${txt.slice(0, 200)}`);
      return;
    }

    const data = await response.json();

    // Check for API errors
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.warn('[LiveScores] API returned errors:', JSON.stringify(data.errors));
      return;
    }

    const fixtures = data.response || [];
    if (fixtures.length === 0) {
      console.log('[LiveScores] No fixtures returned from API.');
      return;
    }

    console.log(`[LiveScores] Received ${fixtures.length} fixtures from API.`);

    let updatedCount = 0;

    for (const fixture of fixtures) {
      const matchStatus = fixture.fixture?.status?.short;
      const homeTeamName = fixture.teams?.home?.name;
      const awayTeamName = fixture.teams?.away?.name;
      const homeScore = fixture.goals?.home;
      const awayScore = fixture.goals?.away;

      if (!homeTeamName || !awayTeamName) continue;

      // Try to find matching record by team name (fuzzy match)
      const allMatches = matches.all();
      const dbMatch = allMatches.find(m => {
        const h = (m.home_team || '').toLowerCase();
        const a = (m.away_team || '').toLowerCase();
        const apiH = homeTeamName.toLowerCase();
        const apiA = awayTeamName.toLowerCase();
        return (h.includes(apiH) || apiH.includes(h)) && (a.includes(apiA) || apiA.includes(a));
      });

      if (!dbMatch) continue;

      let newStatus = dbMatch.status; // keep current if unknown
      if (['1H', 'HT', '2H', 'ET', 'P', 'LIVE'].includes(matchStatus)) newStatus = 'live';
      if (['FT', 'AET', 'PEN'].includes(matchStatus)) newStatus = 'completed';
      if (['NS', 'TBD', 'PST', 'CANC'].includes(matchStatus)) newStatus = 'scheduled';

      const changed = (
        dbMatch.status !== newStatus ||
        (homeScore !== null && dbMatch.home_score !== homeScore) ||
        (awayScore !== null && dbMatch.away_score !== awayScore)
      );

      if (!changed) continue;

      matches.update(m => m.id === dbMatch.id, {
        status: newStatus,
        home_score: homeScore ?? dbMatch.home_score,
        away_score: awayScore ?? dbMatch.away_score,
      });

      // Calculate points for completed matches
      if (newStatus === 'completed' && dbMatch.status !== 'completed' && homeScore !== null && awayScore !== null) {
        const matchPredictions = predictions.find(p => p.match_id === dbMatch.id);
        for (const pred of matchPredictions) {
          const pts = calcPoints(pred.home_score, pred.away_score, homeScore, awayScore);
          predictions.update(p => p.id === pred.id, { points: pts });
        }
        console.log(`[LiveScores] Scored ${matchPredictions.length} predictions for ${homeTeamName} vs ${awayTeamName}`);
      }

      updatedCount++;
    }

    console.log(`[LiveScores] Sync complete — ${updatedCount} matches updated.`);
  } catch (err) {
    console.error('[LiveScores] Fetch error:', err.message);
  }
}

export function startAutomatedLiveScores() {
  // Run immediately on startup
  updateLiveScores();
  // Then every 3 minutes during matches
  const INTERVAL_MS = 3 * 60 * 1000;
  setInterval(updateLiveScores, INTERVAL_MS);
  console.log(`[LiveScores] Auto-sync started — refreshing every ${INTERVAL_MS / 60000} min.`);
}
