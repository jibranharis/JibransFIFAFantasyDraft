import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const targetUsername = "jibran";

const predictionsToInsert = [
  { match_id: 33, home_score: 3, away_score: 1 }, // Netherlands(home) vs Sweden(away)
  { match_id: 35, home_score: 0, away_score: 0 }, // Ecuador(home) vs Curaçao(away)
  { match_id: 37, home_score: 3, away_score: 0 }  // Spain(home) vs Saudi Arabia(away)
  // Note: Germany vs Cape Verde (2-1) is not in the database because they do not play each other in the group stage.
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
