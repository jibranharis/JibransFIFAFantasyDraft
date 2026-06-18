import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const targetUsername = "scity"; // Waiting for user to confirm the username

const predictionsToInsert = [
  { match_id: 17, home_score: 2, away_score: 1 }, // France(home) vs Senegal(away)
  { match_id: 18, home_score: 1, away_score: 1 }, // Iraq(home) vs Norway(away)
  { match_id: 19, home_score: 3, away_score: 0 }, // Argentina(home) vs Algeria(away)
  { match_id: 20, home_score: 2, away_score: 1 }, // Austria(home) vs Jordan(away)
  { match_id: 21, home_score: 3, away_score: 1 }, // Portugal(home) vs DR Congo(away)
  { match_id: 22, home_score: 2, away_score: 1 }, // England(home) vs Croatia(away)
  { match_id: 23, home_score: 1, away_score: 2 }  // Ghana(home) vs Panama(away) => User guessed 2-1 for Panama Ghana, meaning Panama 2, Ghana 1. Ghana is home!
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
