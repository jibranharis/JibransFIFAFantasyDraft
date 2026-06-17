import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: user } = await supabase.from('profiles').select('id').ilike('display_name', 'jibster').single();
  if (!user) {
    console.error('User jibster not found');
    process.exit(1);
  }
  
  // Match 22 is England vs Croatia
  const { data, error } = await supabase.from('predictions').upsert({ 
    user_id: user.id, 
    match_id: 22, 
    home_score: 4, // England
    away_score: 2, // Croatia
    updated_at: new Date().toISOString() 
  }, { onConflict: 'user_id,match_id' });

  if (error) console.error(error);
  else console.log('Successfully inserted 4-2 for jibster on Match 22');
}

run();
