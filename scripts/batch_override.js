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
  { match_id: 48, home_score: 1, away_score: 0 }, // Colombia(home) vs DR Congo(away)
  { match_id: 49, home_score: 2, away_score: 1 }, // Switzerland(home) vs Canada(away)
  { match_id: 50, home_score: 3, away_score: 1 }, // Bosnia-Herzegovina(home) vs Qatar(away)
  { match_id: 52, home_score: 3, away_score: 1 }, // Morocco(home) vs Haiti(away)
  { match_id: 51, home_score: 1, away_score: 3 }  // Scotland(home) vs Brazil(away) -> Brazil 3-1 Scotland
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
