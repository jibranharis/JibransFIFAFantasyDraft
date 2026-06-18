import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const matchIds = [17, 18, 19, 20, 21, 22, 23];
  
  console.log('Triggering point calculations for matches:', matchIds);

  for (let id of matchIds) {
    // Get current home score
    const { data: match, error: fetchErr } = await supabase
      .from('matches')
      .select('home_score')
      .eq('id', id)
      .single();
      
    if (match && match.home_score !== null) {
      // Dummy update to trigger the database's calculate_prediction_points trigger
      const { error: updateErr } = await supabase
        .from('matches')
        .update({ home_score: match.home_score })
        .eq('id', id);
        
      if (updateErr) {
        console.error(`Failed to trigger update for match ${id}:`, updateErr);
      } else {
        console.log(`Successfully recalculated points for Match ${id}`);
      }
    } else {
      console.log(`Match ${id} doesn't have a final score yet or wasn't found.`);
    }
  }
}

run();
