import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const r32Matches = [
  { id: 73, home_team: 'South Africa', away_team: 'Canada', stage: 'round_of_32', match_day: 4, scheduled_at: '2026-06-28T16:00:00.000Z' },
  { id: 74, home_team: 'Brazil', away_team: 'Japan', stage: 'round_of_32', match_day: 4, scheduled_at: '2026-06-29T14:00:00.000Z' },
  { id: 75, home_team: 'Germany', away_team: 'Paraguay', stage: 'round_of_32', match_day: 4, scheduled_at: '2026-06-29T17:30:00.000Z' },
  { id: 76, home_team: 'Netherlands', away_team: 'Morocco', stage: 'round_of_32', match_day: 4, scheduled_at: '2026-06-29T22:00:00.000Z' },
  { id: 77, home_team: 'Ivory Coast', away_team: 'Norway', stage: 'round_of_32', match_day: 5, scheduled_at: '2026-06-30T14:00:00.000Z' },
  { id: 78, home_team: 'France', away_team: 'Sweden', stage: 'round_of_32', match_day: 5, scheduled_at: '2026-06-30T18:00:00.000Z' },
  { id: 79, home_team: 'Mexico', away_team: 'Ecuador', stage: 'round_of_32', match_day: 5, scheduled_at: '2026-06-30T22:00:00.000Z' },
  { id: 80, home_team: 'England', away_team: 'DR Congo', stage: 'round_of_32', match_day: 6, scheduled_at: '2026-07-01T13:00:00.000Z' },
  { id: 81, home_team: 'Belgium', away_team: 'Senegal', stage: 'round_of_32', match_day: 6, scheduled_at: '2026-07-01T17:00:00.000Z' },
  { id: 82, home_team: 'United States', away_team: 'Bosnia-Herzegovina', stage: 'round_of_32', match_day: 6, scheduled_at: '2026-07-01T21:00:00.000Z' },
  { id: 83, home_team: 'Spain', away_team: 'Austria', stage: 'round_of_32', match_day: 7, scheduled_at: '2026-07-02T16:00:00.000Z' },
  { id: 84, home_team: 'Portugal', away_team: 'Croatia', stage: 'round_of_32', match_day: 7, scheduled_at: '2026-07-02T20:00:00.000Z' },
  { id: 85, home_team: 'Switzerland', away_team: 'Algeria', stage: 'round_of_32', match_day: 7, scheduled_at: '2026-07-03T00:00:00.000Z' },
  { id: 86, home_team: 'Australia', away_team: 'Egypt', stage: 'round_of_32', match_day: 8, scheduled_at: '2026-07-03T15:00:00.000Z' },
  { id: 87, home_team: 'Argentina', away_team: 'Cape Verde', stage: 'round_of_32', match_day: 8, scheduled_at: '2026-07-03T19:00:00.000Z' },
  { id: 88, home_team: 'Colombia', away_team: 'Ghana', stage: 'round_of_32', match_day: 8, scheduled_at: '2026-07-03T22:30:00.000Z' }
];

async function run() {
  console.log("Inserting Round of 32 Matches...");

  const { error } = await supabase.from('matches').upsert(r32Matches, { onConflict: 'id' });

  if (error) {
    console.error("Failed to insert matches:", error);
  } else {
    console.log(`Successfully inserted ${r32Matches.length} Round of 32 matches!`);
  }
}

run();
