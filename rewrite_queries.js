import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace HomePage api calls
content = content.replace(/Promise\.all\(\[\s*api\('\/api\/matches'\)\.then\(r => r\.matches \|\| r\),\s*api\('\/api\/leaderboard'\)\.then\(r => r\.leaderboard \|\| r\),\s*api\('\/api\/arenas'\)\.then\(r => r\.arenas \|\| r\)\s*\]\)\.then\(\(\[matches, lb, a\]\) => \{[\s\S]*?\}\)\.catch\(\(\) => \{\}\)\.finally\(\(\) => setLoading\(false\)\)/,
`Promise.all([
      supabase.from('matches').select('*').order('scheduled_at', { ascending: true }),
      supabase.from('leaderboard').select('*').order('total_points', { ascending: false }),
      supabase.from('arenas').select('*, arena_members(user_id)')
    ]).then(([{data: matches}, {data: lb}, {data: a}]) => {
      matches = matches || []
      lb = lb || []
      const arenasData = (a || []).map(ar => ({ ...ar, isMember: ar.arena_members.some(m => m.user_id === user?.id), membersCount: ar.arena_members.length }))
      // TODO: get user predictions to map recentCompleted
      supabase.from('predictions').select('*').eq('user_id', user?.id).then(({data: myPreds}) => {
        const pMap = (myPreds || []).reduce((acc, p) => ({ ...acc, [p.match_id]: p }), {})
        const matchesWithPreds = matches.map(m => ({ ...m, userPrediction: pMap[m.id] }))
        
        setRecentCompleted(matchesWithPreds.filter(m => m.status === 'completed' && m.userPrediction).slice(0, 5))
        setUpcoming(matchesWithPreds.filter(m => m.status === 'scheduled').slice(0, 3))
        setTopPredictors(lb.slice(0, 5))
        setArenas(arenasData)
        const me = lb.find(p => p.user_id === user?.id)
        if (me) setStats({ rank: lb.findIndex(x => x.user_id === user?.id) + 1, totalPoints: me.total_points || 0, exactScores: me.exact_scores || 0, predictions: me.predictions_count || 0 })
      }).finally(() => setLoading(false))
    })`);

// Replace PredictionsPage api calls
content = content.replace(/api\('\/api\/matches'\)\.then\(r => r\.matches \|\| r\)/, `supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => r.data || [])`);
content = content.replace(/api\('\/api\/rounds'\)\.then\(r => r\.rounds \|\| r\)/, `Promise.resolve([])`);
content = content.replace(/api\('\/api\/predictions'\)\.then\(r => r\.predictions \|\| r\)/, `supabase.from('predictions').select('*').eq('user_id', user?.id).then(r => r.data || [])`);
content = content.replace(/await api\('\/api\/predictions\/batch', \{[\s\S]*?body: JSON\.stringify\(\{ predictions: batch \}\)\s*\}\)/,
`const upserts = batch.map(b => ({ user_id: user.id, match_id: b.matchId, home_score: b.homeScore, away_score: b.awayScore }))
      await supabase.from('predictions').upsert(upserts, { onConflict: 'user_id,match_id' })`);

// LeaderboardPage
content = content.replace(/api\('\/api\/leaderboard'\)\.then\(r => setData\(r\.leaderboard \|\| r\)\)\.finally\(\(\) => setLoading\(false\)\)/,
`supabase.from('leaderboard').select('*').order('total_points', { ascending: false }).then(r => setData(r.data || [])).finally(() => setLoading(false))`);

// ArenasPage
content = content.replace(/api\('\/api\/arenas'\)\.then\(r => setArenas\(r\.arenas \|\| r\)\)\.finally\(\(\) => setLoading\(false\)\)/g,
`supabase.from('arenas').select('*, profiles!arenas_owner_id_fkey(display_name), arena_members(user_id)').then(r => {
      const formatted = (r.data || []).map(a => ({ ...a, ownerName: a.profiles?.display_name, membersCount: a.arena_members.length, isMember: a.arena_members.some(m => m.user_id === user?.id) }))
      setArenas(formatted)
    }).finally(() => setLoading(false))`);

content = content.replace(/await api\(\`\/api\/arenas\/join\/\$\{joinCode\.trim\(\)\.toUpperCase\(\)\}\`, \{ method: 'POST' \}\)/,
`const { data: arena } = await supabase.from('arenas').select('id').eq('code', joinCode.trim().toUpperCase()).single()
      if (!arena) throw new Error('Arena not found')
      const { error } = await supabase.from('arena_members').insert({ arena_id: arena.id, user_id: user.id })
      if (error) throw error`);

content = content.replace(/await api\('\/api\/admin\/arenas', \{ method: 'POST', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(\{ name: newArenaName \}\) \}\)/,
`const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      const { data, error } = await supabase.from('arenas').insert({ id: crypto.randomUUID(), name: newArenaName, owner_id: user.id, code }).select().single()
      if (error) throw error
      await supabase.from('arena_members').insert({ arena_id: data.id, user_id: user.id })`);

// AdminPage
content = content.replace(/api\('\/api\/admin\/predictions'\)\.then\(r => r\.users \|\| \[\]\)/,
`supabase.from('profiles').select('id, display_name, predictions(match_id, home_score, away_score)').then(r => {
      return (r.data || []).map(u => ({ id: u.id, displayName: u.display_name, predictions: u.predictions }))
    })`);

content = content.replace(/await api\(\`\/api\/admin\/matches\/\$\{matchId\}\/status\`, \{ method: 'PUT', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(\{ status \}\) \}\)/g,
`await supabase.from('matches').update({ status }).eq('id', matchId)`);

content = content.replace(/await api\(\`\/api\/admin\/matches\/\$\{matchId\}\/result\`, \{ method: 'PUT', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(\{ homeScore: parseInt\(r\.home\), awayScore: parseInt\(r\.away\) \}\) \}\)/g,
`await supabase.from('matches').update({ home_score: parseInt(r.home), away_score: parseInt(r.away) }).eq('id', matchId)`);

content = content.replace(/await api\(\`\/api\/admin\/matches\/\$\{m\.id\}\/status\`, \{ method: 'PUT', headers: \{ 'Content-Type': 'application\/json' \}, body: JSON\.stringify\(\{ status: lock \? 'live' : 'scheduled' \}\) \}\)/g,
`await supabase.from('matches').update({ status: lock ? 'live' : 'scheduled' }).eq('id', m.id)`);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx queries updated');
