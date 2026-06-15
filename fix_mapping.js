import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add formatMatch helper right after imports
content = content.replace(
  `import { supabase } from './supabaseClient'`,
  `import { supabase } from './supabaseClient'\n\nconst formatMatch = m => ({ ...m, homeTeam: m.home_team, awayTeam: m.away_team, homeFlag: m.home_flag, awayFlag: m.away_flag, homeScore: m.home_score, awayScore: m.away_score, groupName: m.group_name, scheduledAt: m.scheduled_at, matchDay: m.match_day })`
);

// 2. HomePage matches mapping and predictions mapping
content = content.replace(`matches = matches || []`, `matches = (matches || []).map(formatMatch)`);
content = content.replace(`const pMap = (myPreds || []).reduce((acc, p) => ({ ...acc, [p.match_id]: p }), {})`,
  `const pMap = (myPreds || []).reduce((acc, p) => ({ ...acc, [p.match_id]: { ...p, homeScore: p.home_score, awayScore: p.away_score } }), {})`);

// 3. HomePage hardcoded banner fix
content = content.replace(`Group Stage – Matchdays 2&3 predictions close in <span style={{ color: '#FFC107' }}>2d 20h 57m</span>`,
  `Group Stage predictions are open!`);
content = content.replace(`29/48 predicted`, `{stats.predictions}/104 predicted`);

// 4. PredictionsPage mapping
content = content.replace(`supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => r.data || [])`,
  `supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => (r.data || []).map(formatMatch))`);

content = content.replace(`supabase.from('predictions').select('*').eq('user_id', user?.id).then(r => r.data || [])`,
  `supabase.from('predictions').select('*').eq('user_id', user?.id).then(r => (r.data || []).map(p => ({ ...p, matchId: p.match_id, homeScore: p.home_score, awayScore: p.away_score })))`);

// 5. MatchesPage mapping
content = content.replace(`supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => ({ matches: r.data || [] }))`,
  `supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => ({ matches: (r.data || []).map(formatMatch) }))`);

// 6. LeaderboardPage mapping
content = content.replace(`supabase.from('leaderboard').select('*').order('total_points', { ascending: false }).then(r => setData(r.data || [])).finally(() => setLoading(false))`,
  `supabase.from('leaderboard').select('*').order('total_points', { ascending: false }).then(r => setData((r.data || []).map(l => ({ ...l, userId: l.user_id, displayName: l.display_name, totalPoints: l.total_points, exactScores: l.exact_scores, predictionsCount: l.predictions_count })))).finally(() => setLoading(false))`);

// 7. AdminPage predictions mapping
content = content.replace(`supabase.from('profiles').select('id, display_name, predictions(match_id, home_score, away_score)').then(r => {
      return (r.data || []).map(u => ({ id: u.id, displayName: u.display_name, predictions: u.predictions }))
    })`,
  `supabase.from('profiles').select('id, display_name, predictions(match_id, home_score, away_score)').then(r => {
      return (r.data || []).map(u => ({ id: u.id, displayName: u.display_name, predictions: u.predictions.map(p => ({ matchId: p.match_id, homeScore: p.home_score, awayScore: p.away_score })) }))
    })`);

// 8. Fix Top Predictors in HomePage to map correctly
content = content.replace(`setTopPredictors(lb.slice(0, 5))`,
  `setTopPredictors((lb || []).map(l => ({ ...l, userId: l.user_id, username: l.display_name, totalPoints: l.total_points, exactScores: l.exact_scores, predictionsCount: l.predictions_count })).slice(0, 5))`);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx mapping fixed');
