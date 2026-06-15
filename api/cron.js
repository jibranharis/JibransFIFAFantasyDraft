import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authorization check (Vercel sets this for cron jobs)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase credentials' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const API_KEY = process.env.API_FOOTBALL_KEY || '6aa4c9a2-07dc-4cae-8b78-836fc7a71341';
  const WORLD_CUP_LEAGUE_ID = 1;
  const SEASON = 2026;

  console.log('[LiveScores] Syncing scores from API-Sports...');

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${WORLD_CUP_LEAGUE_ID}&season=${SEASON}`,
      { headers: { 'x-apisports-key': API_KEY } }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    if (data.errors && Object.keys(data.errors).length > 0) throw new Error(JSON.stringify(data.errors));

    const fixtures = data.response || [];
    if (fixtures.length === 0) return res.json({ message: 'No fixtures returned' });

    const { data: dbMatches } = await supabase.from('matches').select('*');
    if (!dbMatches) return res.status(500).json({ error: 'Failed to fetch matches' });

    let updatedCount = 0;

    for (const fixture of fixtures) {
      const matchStatus = fixture.fixture?.status?.short;
      const homeTeamName = fixture.teams?.home?.name;
      const awayTeamName = fixture.teams?.away?.name;
      const homeScore = fixture.goals?.home;
      const awayScore = fixture.goals?.away;

      if (!homeTeamName || !awayTeamName) continue;

      const dbMatch = dbMatches.find(m => {
        const h = (m.home_team || '').toLowerCase();
        const a = (m.away_team || '').toLowerCase();
        const apiH = homeTeamName.toLowerCase();
        const apiA = awayTeamName.toLowerCase();
        return (h.includes(apiH) || apiH.includes(h)) && (a.includes(apiA) || apiA.includes(a));
      });

      if (!dbMatch) continue;

      // DO NOT revert mock 'completed' data if API says 'scheduled' because the real WC26 hasn't started
      if (dbMatch.status === 'completed' && ['NS', 'TBD', 'PST', 'CANC'].includes(matchStatus)) {
        continue;
      }

      let newStatus = dbMatch.status;
      if (['1H', 'HT', '2H', 'ET', 'P', 'LIVE'].includes(matchStatus)) newStatus = 'live';
      if (['FT', 'AET', 'PEN'].includes(matchStatus)) newStatus = 'completed';
      if (['NS', 'TBD', 'PST', 'CANC'].includes(matchStatus)) newStatus = 'scheduled';

      const changed = (
        dbMatch.status !== newStatus ||
        (homeScore !== null && dbMatch.home_score !== homeScore) ||
        (awayScore !== null && dbMatch.away_score !== awayScore)
      );

      if (!changed) continue;

      await supabase.from('matches').update({
        status: newStatus,
        home_score: homeScore ?? dbMatch.home_score,
        away_score: awayScore ?? dbMatch.away_score
      }).eq('id', dbMatch.id);

      updatedCount++;
    }

    return res.json({ message: `Sync complete — ${updatedCount} matches updated.` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
