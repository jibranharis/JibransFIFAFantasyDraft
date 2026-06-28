import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log("Fetching all matches to build flag mapping...");
  const { data: matches, error } = await supabase.from('matches').select('home_team, home_flag, away_team, away_flag');
  
  if (error) {
    console.error("Error fetching matches:", error);
    process.exit(1);
  }

  const flagMap = {};
  matches.forEach(m => {
    if (m.home_team && m.home_flag && m.home_flag !== 'NULL') flagMap[m.home_team] = m.home_flag;
    if (m.away_team && m.away_flag && m.away_flag !== 'NULL') flagMap[m.away_team] = m.away_flag;
  });

  // Handle alternative naming mappings
  if (flagMap['Ivory Coast']) flagMap['Côte d\'Ivoire'] = flagMap['Ivory Coast'];
  if (flagMap['Côte d\'Ivoire']) flagMap['Ivory Coast'] = flagMap['Côte d\'Ivoire'];
  
  if (flagMap['Cape Verde']) flagMap['Cabo Verde'] = flagMap['Cape Verde'];
  if (flagMap['Cabo Verde']) flagMap['Cape Verde'] = flagMap['Cabo Verde'];
  
  if (flagMap['United States']) flagMap['USA'] = flagMap['United States'];
  if (flagMap['USA']) flagMap['United States'] = flagMap['USA'];

  console.log("Fetching Round of 32 matches to update flags...");
  const { data: r32 } = await supabase.from('matches').select('*').eq('stage', 'round_of_32');
  
  for (const m of r32 || []) {
    let hFlag = flagMap[m.home_team];
    let aFlag = flagMap[m.away_team];
    
    // In case there are trailing spaces or anything
    if (!hFlag) hFlag = flagMap[m.home_team.trim()];
    if (!aFlag) aFlag = flagMap[m.away_team.trim()];

    if (hFlag || aFlag) {
      const updateData = {};
      if (hFlag) updateData.home_flag = hFlag;
      if (aFlag) updateData.away_flag = aFlag;

      const { error: updateErr } = await supabase.from('matches').update(updateData).eq('id', m.id);
      
      if (updateErr) {
        console.error(`Failed to update flags for Match ${m.id} (${m.home_team} vs ${m.away_team})`);
      } else {
        console.log(`Updated Match ${m.id}: ${m.home_team} (${hFlag}) vs ${m.away_team} (${aFlag})`);
      }
    } else {
      console.log(`Could not find flags for Match ${m.id}: ${m.home_team} vs ${m.away_team}`);
    }
  }
}

run();
