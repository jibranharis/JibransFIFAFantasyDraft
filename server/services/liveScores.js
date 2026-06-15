import { matches, calculatePoints, rounds } from '../db.js';

// This is the automated live score fetcher using API-Football (most popular sports API)
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = 4; // World Cup
const SEASON = 2026;

// Function to fetch and update live scores automatically
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
    
    // Process each fixture
    for (const fixture of fixtures) {
      const matchStatus = fixture.fixture.status.short; // "NS", "1H", "HT", "2H", "FT"
      const homeTeam = fixture.teams.home.name;
      const awayTeam = fixture.teams.away.name;
      const homeScore = fixture.goals.home;
      const awayScore = fixture.goals.away;

      // Find match in our DB by team names
      const dbMatch = matches.find(m => m.home_team === homeTeam && m.away_team === awayTeam)[0];
      
      if (dbMatch) {
        let status = 'scheduled';
        if (['1H', 'HT', '2H', 'ET', 'P', 'LIVE'].includes(matchStatus)) status = 'live';
        if (['FT', 'AET', 'PEN'].includes(matchStatus)) status = 'completed';

        // Update if status or score changed
        if (dbMatch.status !== status || dbMatch.home_score !== homeScore || dbMatch.away_score !== awayScore) {
          matches.update(dbMatch.id, {
            status,
            home_score: homeScore !== null ? homeScore : null,
            away_score: awayScore !== null ? awayScore : null
          });
          
          if (status === 'completed' && dbMatch.status !== 'completed') {
            calculatePoints(dbMatch.id); // Award points automatically!
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

// Start the cron job (runs every 5 minutes)
export function startAutomatedLiveScores() {
  updateLiveScores(); // Run immediately on boot
  setInterval(updateLiveScores, 5 * 60 * 1000); // Run every 5 minutes
}

// Simulates live score updates when no API key is present
function simulateLiveScores() {
  const liveMatches = matches.find(m => m.status === 'live');
  for (const m of liveMatches) {
    if (Math.random() > 0.7) {
      // 30% chance a goal is scored every 5 mins!
      const side = Math.random() > 0.5 ? 'home_score' : 'away_score';
      matches.update(m.id, { [side]: (m[side] || 0) + 1 });
      console.log(`[LiveScores] GOAL in simulated match: ${m.home_team} vs ${m.away_team}`);
    }
  }
}
