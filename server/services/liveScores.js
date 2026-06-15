import { matches, predictions, rounds } from '../db.js';

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

const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = 4;
const SEASON = 2026;

export async function updateLiveScores() {
  console.log('[LiveScores] Automated API sync starting...');

  if (!API_FOOTBALL_KEY) {
    console.log('[LiveScores] No API key found. Simulating live scores for demo purposes...');
    simulateLiveScores();
    return;
  }

  try {
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_FOOTBALL_KEY,
      }
    });
    
    if (!response.ok) throw new Error('API Request failed');
    
    const data = await response.json();
    const fixtures = data.response || [];

    let updatedCount = 0;
    
    for (const fixture of fixtures) {
      const matchStatus = fixture.fixture.status.short;
      const homeTeam = fixture.teams.home.name;
      const awayTeam = fixture.teams.away.name;
      const homeScore = fixture.goals.home;
      const awayScore = fixture.goals.away;

      const dbMatch = matches.find(m => m.home_team === homeTeam && m.away_team === awayTeam)[0];
      
      if (dbMatch) {
        let status = 'scheduled';
        if (['1H', 'HT', '2H', 'ET', 'P', 'LIVE'].includes(matchStatus)) status = 'live';
        if (['FT', 'AET', 'PEN'].includes(matchStatus)) status = 'completed';

        if (dbMatch.status !== status || dbMatch.home_score !== homeScore || dbMatch.away_score !== awayScore) {
          matches.update(m => m.id === dbMatch.id, {
            status,
            home_score: homeScore !== null ? homeScore : null,
            away_score: awayScore !== null ? awayScore : null
          });
          
          if (status === 'completed' && dbMatch.status !== 'completed' && homeScore !== null && awayScore !== null) {
            const matchPredictions = predictions.find((p) => p.match_id === dbMatch.id);
            for (const pred of matchPredictions) {
              const pts = calcPoints(pred.home_score, pred.away_score, homeScore, awayScore);
              predictions.update((p) => p.id === pred.id, { points: pts });
            }
          }
          updatedCount++;
        }
      }
    }
    console.log(`[LiveScores] Automated sync complete. Updated ${updatedCount} matches.`);
  } catch (err) {
    console.error('[LiveScores] Error fetching automated scores:', err.message);
  }
}

export function startAutomatedLiveScores() {
  updateLiveScores();
  setInterval(updateLiveScores, 5 * 60 * 1000);
}

function simulateLiveScores() {
  const liveMatches = matches.find(m => m.status === 'live');
  for (const m of liveMatches) {
    if (Math.random() > 0.7) {
      const side = Math.random() > 0.5 ? 'home_score' : 'away_score';
      matches.update(x => x.id === m.id, { [side]: (m[side] || 0) + 1 });
      console.log(`[LiveScores] GOAL in simulated match: ${m.home_team} vs ${m.away_team}`);
    }
  }
}
