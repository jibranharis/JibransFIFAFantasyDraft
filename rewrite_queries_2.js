import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// MatchesPage load function
content = content.replace(/api\('\/api\/matches'\)/, `supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => ({ matches: r.data || [] }))`);

// PredictionsPage single prediction
content = content.replace(/await api\('\/api\/predictions', \{[\s\S]*?body: JSON\.stringify\(\{ matchId: m\.id, homeScore: inputs\[m\.id\]\.home, awayScore: inputs\[m\.id\]\.away \}\)\s*\}\)/,
`await supabase.from('predictions').upsert({ user_id: user.id, match_id: m.id, home_score: inputs[m.id].home, away_score: inputs[m.id].away }, { onConflict: 'user_id,match_id' })`);

// JoinArenaPage
content = content.replace(/api\(\`\/api\/arenas\/join\/\$\{code\.trim\(\)\.toUpperCase\(\)\}\`, \{ method: 'POST' \}\)/,
`supabase.from('arenas').select('id').eq('code', code.trim().toUpperCase()).single().then(({data: arena}) => {
        if (!arena) throw new Error('Arena not found')
        return supabase.from('arena_members').insert({ arena_id: arena.id, user_id: user.id })
      })`);

// AdminPage initial load
content = content.replace(/api\('\/api\/matches'\)\.then\(r => r\.matches \|\| r\)/, `supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => r.data || [])`);
content = content.replace(/api\('\/api\/rounds'\)\.then\(r => r\.rounds \|\| r\)/, `Promise.resolve([])`);


fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx remaining queries updated');
