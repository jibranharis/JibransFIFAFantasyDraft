import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: matches, error: fetchErr } = await supabase
    .from('matches')
    .select('id, home_score')
    .eq('status', 'completed');
    
  if (fetchErr) {
    console.error("Error fetching matches:", fetchErr);
    process.exit(1);
  }

  console.log('Triggering point calculations for matches:', matches.map(m => m.id));

  for (let match of matches) {
    if (match && match.home_score !== null) {
      // Dummy update to trigger the database's calculate_prediction_points trigger
      const { error: updateErr } = await supabase
        .from('matches')
        .update({ home_score: match.home_score })
        .eq('id', match.id);
        
      if (updateErr) {
        console.error(`Failed to trigger update for match ${match.id}:`, updateErr);
      } else {
        console.log(`Successfully recalculated points for Match ${match.id}`);
      }
    } else {
      console.log(`Match ${match.id} doesn't have a final score yet or wasn't found.`);
    }
  }
}

run();
