import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const targetUsername = "jibster";

const predictionsToInsert = [
  { match_id: 62, home_score: 3, away_score: 0 }, // Senegal(home) vs Iraq(away)
  { match_id: 63, home_score: 0, away_score: 0 }, // Cape Verde(home) vs Saudi Arabia(away)
  { match_id: 64, home_score: 0, away_score: 2 }, // Uruguay(home) vs Spain(away)
  { match_id: 66, home_score: 0, away_score: 2 }, // New Zealand(home) vs Belgium(away)
  { match_id: 65, home_score: 3, away_score: 1 }, // Egypt(home) vs Iran(away)
  { match_id: 67, home_score: 0, away_score: 2 }, // Panama(home) vs England(away)
  { match_id: 68, home_score: 3, away_score: 1 }, // Croatia(home) vs Ghana(away)
  { match_id: 69, home_score: 1, away_score: 0 }, // Colombia(home) vs Portugal(away)
  { match_id: 70, home_score: 2, away_score: 1 }, // DR Congo(home) vs Uzbekistan(away)
  { match_id: 71, home_score: 1, away_score: 1 }, // Algeria(home) vs Austria(away)
  { match_id: 72, home_score: 1, away_score: 3 }  // Jordan(home) vs Argentina(away)
];

async function run() {
  const { data: user } = await supabase.from('profiles').select('id').ilike('display_name', targetUsername).single();
  if (!user) {
    console.error(`User ${targetUsername} not found. Make sure they have created their new account and you have the exact spelling!`);
    process.exit(1);
  }
  
  console.log(`Found user ${targetUsername} with ID ${user.id}. Inserting predictions...`);

  const toUpsert = predictionsToInsert.map(p => ({
    user_id: user.id,
    match_id: p.match_id,
    home_score: p.home_score,
    away_score: p.away_score,
    updated_at: new Date().toISOString()
  }));

  const { error } = await supabase.from('predictions').upsert(toUpsert, { onConflict: 'user_id,match_id' });

  if (error) {
    console.error("Failed to insert predictions:", error);
  } else {
    console.log(`Successfully inserted ${toUpsert.length} predictions for ${targetUsername}!`);
  }
}

run();
