import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function getAbbr(name) {
  if (!name) return '';
  const map = {
    'United States': 'USA',
    'Korea Republic': 'KOR',
    'South Africa': 'RSA',
    'Bosnia-Herzegovina': 'BIH',
    'Netherlands': 'NED',
    'Saudi Arabia': 'KSA',
    'New Zealand': 'NZL',
    'DR Congo': 'COD',
    'Czechia': 'CZE'
  };
  if (map[name]) return map[name];
  return name.substring(0, 3).toUpperCase();
}

async function checkScores() {
  console.log("Checking for matches that should have finished...");

  // Calculate the time 2 hours ago
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  // Fetch matches that are scheduled or live, but started over 2 hours ago
  const { data: matches, error } = await supabase
    .from('matches')
    .select('*')
    .in('status', ['scheduled', 'live'])
    .lte('scheduled_at', twoHoursAgo.toISOString());

  if (error) {
    console.error("Error fetching matches:", error);
    process.exit(1);
  }

  if (!matches || matches.length === 0) {
    console.log("No completed or live matches need checking right now.");
    return;
  }

  console.log(`Found ${matches.length} match(es) to check.`);

  for (const match of matches) {
    const matchDate = new Date(match.scheduled_at);
    // Format to YYYYMMDD for ESPN API
    const dateStr = matchDate.toISOString().split('T')[0].replace(/-/g, '');
    
    console.log(`\nChecking score for ${match.home_team} vs ${match.away_team} (Match ID: ${match.id}) on ${dateStr}`);
    
    try {
      const resp = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${dateStr}`);
      const data = await resp.json();
      
      let foundEvent = null;
      
      for (const event of data.events || []) {
        const comp = event.competitions[0];
        const competitors = comp.competitors;
        
        // Find home and away in ESPN data
        const espnHome = competitors.find(c => c.homeAway === 'home');
        const espnAway = competitors.find(c => c.homeAway === 'away');
        
        const homeAbbrMatch = getAbbr(match.home_team) === espnHome?.team?.abbreviation;
        const awayAbbrMatch = getAbbr(match.away_team) === espnAway?.team?.abbreviation;
        const homeNameMatch = espnHome?.team?.name.includes(match.home_team) || match.home_team.includes(espnHome?.team?.name);
        const awayNameMatch = espnAway?.team?.name.includes(match.away_team) || match.away_team.includes(espnAway?.team?.name);

        if ((homeAbbrMatch || homeNameMatch) && (awayAbbrMatch || awayNameMatch)) {
          foundEvent = event;
          break;
        }
      }

      if (foundEvent) {
        const comp = foundEvent.competitions[0];
        const isCompleted = comp.status.type.completed;
        const espnHome = comp.competitors.find(c => c.homeAway === 'home');
        const espnAway = comp.competitors.find(c => c.homeAway === 'away');

        const homeScore = parseInt(espnHome.score);
        const awayScore = parseInt(espnAway.score);

        if (isCompleted && !isNaN(homeScore) && !isNaN(awayScore)) {
          console.log(`Match finished! Score: ${homeScore} - ${awayScore}. Updating database...`);
          
          const { error: updateError } = await supabase
            .from('matches')
            .update({
              home_score: homeScore,
              away_score: awayScore,
              status: 'completed'
            })
            .eq('id', match.id);

          if (updateError) {
            console.error(`Failed to update match ${match.id}:`, updateError);
          } else {
            console.log(`Successfully updated match ${match.id}`);
          }
        } else {
          console.log(`Match found, but not completed yet. Status: ${comp.status.type.description}`);
        }
      } else {
        console.log(`Could not find this match in ESPN data for date ${dateStr}.`);
      }
      
    } catch (err) {
      console.error(`Error fetching from ESPN for match ${match.id}:`, err.message);
    }
  }
}

checkScores();
// trigger update scores
