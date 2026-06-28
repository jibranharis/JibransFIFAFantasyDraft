import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const matchesToUpdate = [
  { match_id: 62, home_score: 5, away_score: 0 }, // Senegal(home) vs Iraq(away)
  { match_id: 63, home_score: 0, away_score: 0 }, // Cape Verde(home) vs Saudi Arabia(away)
  { match_id: 64, home_score: 0, away_score: 1 }, // Uruguay(home) vs Spain(away)
  { match_id: 66, home_score: 1, away_score: 5 }, // New Zealand(home) vs Belgium(away)
  { match_id: 65, home_score: 1, away_score: 1 }, // Egypt(home) vs Iran(away)
  { match_id: 67, home_score: 0, away_score: 2 }, // Panama(home) vs England(away)
  { match_id: 68, home_score: 2, away_score: 1 }, // Croatia(home) vs Ghana(away)
  { match_id: 69, home_score: 0, away_score: 0 }, // Colombia(home) vs Portugal(away)
  { match_id: 70, home_score: 3, away_score: 1 }, // DR Congo(home) vs Uzbekistan(away)
  { match_id: 71, home_score: 3, away_score: 3 }, // Algeria(home) vs Austria(away)
  { match_id: 72, home_score: 1, away_score: 3 }  // Jordan(home) vs Argentina(away)
];

async function run() {
  console.log("Updating final scores for group stage matches...");

  for (const m of matchesToUpdate) {
    const { error } = await supabase
      .from('matches')
      .update({
        home_score: m.home_score,
        away_score: m.away_score,
        status: 'completed'
      })
      .eq('id', m.match_id);

    if (error) {
      console.error(`Failed to update match ${m.match_id}:`, error);
    } else {
      console.log(`Successfully updated match ${m.match_id} to ${m.home_score}-${m.away_score}`);
    }
  }
}

run();
