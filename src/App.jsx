import { useState, useEffect, createContext, useContext, useCallback } from 'react'

// Auth Context
const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// Toast Context
const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

// API helper
async function api(path, opts = {}) {
  const res = await fetch(path, { credentials: 'include', ...opts })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

function getAbbr(team) {
  if (!team || team.startsWith('Team ')) return 'TBD'
  if (team.toUpperCase() === 'USA') return 'USA'
  if (team.toUpperCase() === 'SOUTH KOREA') return 'KOR'
  if (team.toUpperCase() === 'SOUTH AFRICA') return 'RSA'
  if (team.toUpperCase() === 'IVORY COAST') return 'CIV'
  return team.substring(0, 3).toUpperCase()
}

// Toast component
function Toasts({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>{t.title}</div>
          {t.message && <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{t.message}</div>}
        </div>
      ))}
    </div>
  )
}

// Sidebar
function Sidebar({ page, setPage }) {
  const { user, logout } = useAuth()
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'predictions', icon: '⚽', label: 'Predictions' },
    { id: 'matches', icon: '📅', label: 'Matches' },
    { id: 'groups', icon: '👥', label: 'Groups' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'arenas', icon: '🏟️', label: 'Arenas' },
    { id: 'my-results', icon: '📊', label: 'My Results' },
    ...(user?.isAdmin ? [{ id: 'admin', icon: '⚙️', label: 'Admin Panel' }] : []),
  ]

  return (
    <div className="sidebar flex flex-col justify-between h-full p-4 border-r border-slate-800 bg-[#0A1128] w-[260px]">
      <div>
        <div className="sidebar-logo flex items-center gap-3 font-black text-2xl mb-8 tracking-tight text-white">
          <span className="text-3xl">🏆</span> 
          <div>
            <div>Fútbol is Life</div>
            <div className="text-xs font-normal text-slate-400 tracking-normal uppercase">WC 2026 Predictions</div>
          </div>
        </div>
        <nav className="sidebar-nav space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${page === item.id ? 'bg-[#FFD700] text-black shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              onClick={() => setPage(item.id)}
            >
              <div className="flex items-center gap-3">
                <span className="nav-icon opacity-80">{item.icon}</span>
                {item.label}
              </div>
              {page === item.id && <span className="opacity-60 text-sm font-black">&gt;</span>}
            </button>
          ))}
        </nav>
      </div>
      
      <div>
        <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative">
           <img src="https://images.unsplash.com/photo-1518605368461-1ee7c5320c2d?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3">
             <span className="text-[10px] font-black tracking-[0.2em] text-white/80">USA · CANADA · MEXICO</span>
           </div>
        </div>

        {user && (
          <div className="sidebar-user bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-bold text-lg">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="sidebar-user-name text-sm font-bold truncate text-white">{user.displayName}</div>
              <div className="sidebar-user-email text-xs text-slate-400 truncate">{user.email}</div>
            </div>
          </div>
        )}
        {user && (
          <button className="w-full mt-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors" onClick={logout}>
            <span>↪️</span> Sign out
          </button>
        )}
      </div>
    </div>
  )
}

// Login/Register page
function AuthPage() {
  const { login } = useAuth()
  const { toast } = useToast()
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', displayName: '' })
  const [error, setError] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, displayName: form.displayName }
      const data = await api(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      login(data.user)
      toast('success', mode === 'login' ? 'Welcome back!' : 'Account created!', `Signed in as ${data.user.displayName}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🏆 Fútbol is Life</div>
        <div className="auth-sub">World Cup 2026 Predictions</div>
        <form onSubmit={submit}>
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input className="form-input" placeholder="Your name" value={form.displayName} onChange={set('displayName')} required />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Password" value={form.password} onChange={set('password')} required minLength={mode === 'register' ? 6 : 1} />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16, padding: '12px', justifyContent: 'center' }} disabled={loading}>
            {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <div className="auth-toggle">
          {mode === 'login' ? (
            <>Don't have an account? <button onClick={() => setMode('register')}>Register</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode('login')}>Sign in</button></>
          )}
        </div>
      </div>
    </div>
  )
}

// Home page
function HomePage() {
  const { user } = useAuth()
  
  const [stats, setStats] = useState({ rank: 62, totalPoints: 0, exactScores: 0, predictions: 29 })
  const [arenas, setArenas] = useState([])
  const [topPredictors, setTopPredictors] = useState([])
  
  useEffect(() => {
    api('/api/arenas').then(r => setArenas((r.arenas || r).slice(0, 3))).catch(() => {})
    api('/api/leaderboard').then(r => {
      const lb = r.leaderboard || r;
      setTopPredictors(lb.slice(0, 5))
      const me = lb.find(p => p.userId === user?.id);
      if (me) {
        setStats({ rank: me.rank || 62, totalPoints: me.totalPoints || 0, exactScores: me.exactScores || 0, predictions: me.correctOutcomes || 29 })
      }
    }).catch(() => {})
  }, [user?.id])

  // Timer logic (mocked for visuals)
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 36, seconds: 59 })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else {
          seconds = 59
          if (minutes > 0) minutes--
          else {
            minutes = 59
            if (hours > 0) hours--
            else {
              hours = 23
              if (days > 0) days--
            }
          }
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = n => n.toString().padStart(2, '0')

  return (
    <div className="page-content">
      <div className="welcome-banner" style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
          Welcome back, {user?.displayName || 'Player'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Ready for the next match?</p>
      </div>

      <div className="countdown-card card" style={{ marginBottom: 32, textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: 'var(--primary)', marginBottom: 16, fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: 2, fontSize: '1rem' }}>Next Round Locks In</h3>
        <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', display: 'flex', justifyContent: 'center', gap: 16 }}>
          <span>{pad(timeLeft.days)}<span style={{ fontSize: '1rem', display: 'block', color: 'var(--text-muted)', fontWeight: 600 }}>Days</span></span><span style={{ color: 'var(--surface-border)' }}>:</span>
          <span>{pad(timeLeft.hours)}<span style={{ fontSize: '1rem', display: 'block', color: 'var(--text-muted)', fontWeight: 600 }}>Hours</span></span><span style={{ color: 'var(--surface-border)' }}>:</span>
          <span>{pad(timeLeft.minutes)}<span style={{ fontSize: '1rem', display: 'block', color: 'var(--text-muted)', fontWeight: 600 }}>Mins</span></span><span style={{ color: 'var(--surface-border)' }}>:</span>
          <span>{pad(timeLeft.seconds)}<span style={{ fontSize: '1rem', display: 'block', color: 'var(--text-muted)', fontWeight: 600 }}>Secs</span></span>
        </div>
      </div>

      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 40 }}>
        <div className="stat-card card" style={{ padding: 24, textAlign: 'center', marginBottom: 0 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Global Rank</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900, color: 'var(--primary)' }}>#{stats.rank}</div>
        </div>
        <div className="stat-card card" style={{ padding: 24, textAlign: 'center', marginBottom: 0 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Total Points</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>{stats.totalPoints}</div>
        </div>
        <div className="stat-card card" style={{ padding: 24, textAlign: 'center', marginBottom: 0 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Exact Scores</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>{stats.exactScores}</div>
        </div>
        <div className="stat-card card" style={{ padding: 24, textAlign: 'center', marginBottom: 0 }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Predictions</div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>{stats.predictions}</div>
        </div>
      </div>

      <div className="split-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="left-side card" style={{ padding: 24, marginBottom: 0 }}>
          <h3 style={{ marginBottom: 20, fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem' }}>Your Arenas</h3>
          {arenas.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>No arenas yet.</div>
          ) : arenas.map(a => (
            <div key={a.id} className="arena-row" style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{a.name}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{a.memberCount} members</span>
            </div>
          ))}
        </div>
        <div className="right-side card" style={{ padding: 24, marginBottom: 0 }}>
          <h3 style={{ marginBottom: 20, fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem' }}>Top Predictors</h3>
          {topPredictors.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>No predictors yet.</div>
          ) : topPredictors.map((p, i) => (
            <div key={p.userId} className="predictor-row" style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}><strong style={{ color: 'var(--text-muted)', marginRight: 12 }}>#{i+1}</strong> {p.username}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{p.totalPoints} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Predictions page
function PredictionsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])
  const [activeRound, setActiveRound] = useState('group_stage_1')
  const [scores, setScores] = useState({})
  const [saving, setSaving] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api('/api/matches').then(r => r.matches || r),
      api('/api/rounds').then(r => r.rounds || r)
    ]).then(([m, r]) => {
      setMatches(m)
      setRounds(r)
      const init = {}
      m.forEach(match => {
        if (match.userPrediction) {
          init[match.id] = { home: match.userPrediction.homeScore, away: match.userPrediction.awayScore }
        }
      })
      setScores(init)
    }).finally(() => setLoading(false))
  }, [])

  const roundMatches = matches.filter(m => {
    if (activeRound === 'group_stage_1') return m.stage === 'group_stage' && m.matchDay === 1
    if (activeRound === 'group_stage_2') return m.stage === 'group_stage' && m.matchDay >= 2
    return m.stage === activeRound
  })

  const currentRound = rounds.find(r => r.slug === activeRound)
  const isLocked = currentRound?.isLocked && !user?.isAdmin

  const saveScore = async (matchId) => {
    const s = scores[matchId]
    if (s?.home === undefined || s?.away === undefined || s?.home === '' || s?.away === '') return
    setSaving(v => ({ ...v, [matchId]: true }))
    try {
      await api('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, homeScore: parseInt(s.home), awayScore: parseInt(s.away) })
      })
      toast('success', 'Prediction saved! ⚽')
    } catch (err) {
      toast('error', 'Failed to save', err.message)
    } finally {
      setSaving(v => ({ ...v, [matchId]: false }))
    }
  }

  const setScore = (matchId, side, val) => {
    setScores(v => ({ ...v, [matchId]: { ...v[matchId], [side]: val } }))
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  const predictedCount = roundMatches.filter(m => scores[m.id]?.home !== undefined).length

  return (
    <div className="page-content max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <span className="bg-[#151e32] p-2 rounded-xl text-2xl border border-white/5">⚽</span>
          Predictions
        </h1>
        <p className="text-slate-400 mt-2">Predict every score before each window locks. Group Stage splits into two deadlines.</p>
      </div>

      <div className="bg-[#151e32] border border-white/5 rounded-2xl p-1 flex gap-1 mb-8 overflow-x-auto">
        {rounds.slice(0, 6).map(r => (
          <button 
            key={r.slug} 
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeRound === r.slug ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`} 
            onClick={() => setActiveRound(r.slug)}
          >
            {r.slug === 'group_stage_1' ? 'Week 1' : r.slug === 'group_stage_2' ? 'Week 2' : r.name}
            {activeRound === r.slug && (
               <span className="text-green-500 font-bold text-xs ml-1">{predictedCount}/{roundMatches.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-black text-white uppercase tracking-tight">
          {currentRound?.slug === 'group_stage_1' ? 'WEEK 1' : currentRound?.slug === 'group_stage_2' ? 'WEEK 2' : currentRound?.name}
        </h2>
        {user?.isAdmin ? (
          <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase px-2 py-1 rounded-md border border-yellow-500/30">⚡ Admin Override</span>
        ) : isLocked ? (
          <span className="bg-red-500/20 text-red-500 text-[10px] font-black uppercase px-2 py-1 rounded-md border border-red-500/30">LOCKED</span>
        ) : (
          <span className="bg-green-500/20 text-green-500 text-[10px] font-black uppercase px-2 py-1 rounded-md border border-green-500/30">OPEN</span>
        )}
      </div>

      {isLocked && !user?.isAdmin && (
        <div className="bg-[#151e32] border border-red-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-red-500">🔒</span>
          <div>
            <div className="text-red-500 font-bold">Predictions closed</div>
            <div className="text-slate-400 text-xs">0/{roundMatches.length} predicted · +1 pt outcome / +3 pts exact score</div>
          </div>
        </div>
      )}

      {roundMatches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No matches in this round yet</div>
        </div>
      ) : (
        <div className="bg-[#151e32] border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col divide-y divide-white/5">
          {roundMatches.map(match => {
            const s = scores[match.id] || {}
            const canEdit = user?.isAdmin || !isLocked

            return (
              <div key={match.id} className="flex flex-col md:flex-row items-center justify-between p-4 hover:bg-white/[0.02] transition-colors gap-4">
                <div className="w-full md:w-32 text-[11px] font-bold text-slate-400 text-center md:text-left">
                  {new Date(match.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 w-full">
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <span className="font-black text-white text-lg">{getAbbr(match.homeTeam)}</span>
                    <span className="text-3xl filter drop-shadow-md">{match.homeFlag}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center w-24">
                    {canEdit ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number" min="0" max="20" 
                          className="w-10 h-10 bg-black/40 border border-white/10 rounded-lg text-center font-black text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                          value={s.home ?? match.userPrediction?.homeScore ?? ''}
                          onChange={e => setScore(match.id, 'home', e.target.value)}
                          placeholder="0"
                        />
                        <span className="text-slate-500 font-black">-</span>
                        <input
                          type="number" min="0" max="20" 
                          className="w-10 h-10 bg-black/40 border border-white/10 rounded-lg text-center font-black text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none"
                          value={s.away ?? match.userPrediction?.awayScore ?? ''}
                          onChange={e => setScore(match.id, 'away', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="text-2xl font-black text-white tracking-tighter">
                          {match.userPrediction ? `${match.userPrediction.homeScore} - ${match.userPrediction.awayScore}` : '-'}
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 mt-1">
                          {match.status === 'completed' ? 'FT' : match.status === 'live' ? 'LIVE' : ''}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-1 justify-start">
                    <span className="text-3xl filter drop-shadow-md">{match.awayFlag}</span>
                    <span className="font-black text-white text-lg">{getAbbr(match.awayTeam)}</span>
                  </div>
                </div>

                <div className="w-full md:w-24 flex justify-center md:justify-end">
                  {canEdit ? (
                    <button
                      className="bg-white/5 hover:bg-[#FFD700] text-slate-300 hover:text-black font-bold text-xs px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
                      onClick={() => saveScore(match.id)}
                      disabled={saving[match.id]}
                    >
                      {saving[match.id] ? '...' : 'SAVE'}
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500">
                      {match.userPrediction ? 'PREDICTED' : 'NO PREDICTION'}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Leaderboard page
function LeaderboardPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    api('/api/leaderboard').then(r => setData(r.leaderboard || r)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  return (
    <div className="page-content max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <span className="bg-[#151e32] p-2 rounded-xl text-2xl border border-white/5">🏆</span>
          Leaderboard
        </h1>
        <p className="text-slate-400 mt-2">How do you stack up against the rest?</p>
      </div>

      <div className="flex gap-2 mb-8">
        <button className="bg-[#FFD700] text-black shadow-sm flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
          <span className="h-3.5 w-3.5">🌍</span> Global
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No scores yet</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {top3.map((p) => {
              const isMe = p.userId === user?.id
              const medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'
              const colorClass = p.rank === 1 
                ? 'border-yellow-500/30 bg-yellow-500/5' 
                : p.rank === 2 
                  ? 'border-slate-400/20 bg-slate-400/5' 
                  : 'border-amber-600/20 bg-amber-600/5'
                  
              return (
                <div key={p.userId} className={`rounded-xl border p-4 text-center flex flex-col items-center gap-2 relative overflow-hidden ${colorClass}`}>
                  {isMe && <div className="absolute top-0 w-full h-1 bg-[#FFD700]"></div>}
                  <div className="text-3xl">{medal}</div>
                  <div className="font-black text-white text-lg truncate w-full">{p.username}</div>
                  <div className="text-2xl font-black text-white">{p.totalPoints} <span className="text-sm text-slate-500 font-normal">pts</span></div>
                  <div className="flex gap-2 text-xs font-bold mt-2">
                    <span className="bg-white/10 px-2 py-1 rounded text-slate-300">{p.exactScores} 🎯</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-slate-300">{p.correctOutcomes} ✓</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-[#151e32] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-center w-16">Rank</th>
                    <th className="px-4 py-3">Player</th>
                    <th className="px-4 py-3 text-center">Preds</th>
                    <th className="px-4 py-3 text-center">Correct</th>
                    <th className="px-4 py-3 text-center">Exact</th>
                    <th className="px-4 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((p) => {
                    const isMe = p.userId === user?.id
                    return (
                      <tr key={p.userId} className={`${isMe ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'} transition-colors`}>
                        <td className="px-4 py-4 text-center">
                          <span className={`font-black ${p.rank <= 3 ? 'text-[#FFD700]' : 'text-slate-500'}`}>
                            {p.rank}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold text-white flex items-center gap-2">
                          {p.username}
                          {isMe && <span className="bg-[#FFD700] text-black text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wide">You</span>}
                        </td>
                        <td className="px-4 py-4 text-center font-medium text-slate-400">{p.predictionsCount}</td>
                        <td className="px-4 py-4 text-center font-medium text-slate-400">{p.correctOutcomes}</td>
                        <td className="px-4 py-4 text-center font-medium text-slate-400">{p.exactScores}</td>
                        <td className="px-4 py-4 text-right font-black text-white text-base">{p.totalPoints}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Matches page
function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/api/matches').then(r => setMatches(r.matches || r)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  const groups = {}
  matches.forEach(m => {
    const g = m.groupName ? `GROUP ${m.groupName}` : m.stage
    if (!groups[g]) groups[g] = []
    groups[g].push(m)
  })

  return (
    <div className="page-content max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <span className="bg-[#151e32] p-2 rounded-xl text-2xl border border-white/5">📅</span>
          Matches
        </h1>
        <p className="text-slate-400 mt-2">All 104 World Cup 2026 matches by round.</p>
      </div>

      {Object.entries(groups).map(([g, gMatches]) => (
        <div key={g} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#FFD700] text-xl">📅</span>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">{g}</h2>
            <span className="text-xs text-slate-500 font-bold ml-2">{gMatches.length} matches</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gMatches.map(m => (
              <div key={m.id} className="bg-[#151e32] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-[11px] font-bold text-slate-400">
                      {new Date(m.scheduledAt).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-[10px] font-black tracking-wider text-slate-500 uppercase bg-white/5 px-2 py-1 rounded-md">{g}</div>
                  </div>
                  
                  <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-2 w-20">
                      <span className="text-4xl filter drop-shadow-md">{m.homeFlag}</span>
                      <span className="font-black text-white tracking-tight">{getAbbr(m.homeTeam)}</span>
                      <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">{m.homeTeam}</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center flex-1">
                      {m.status === 'completed' || m.status === 'live' ? (
                        <>
                          <div className="text-3xl font-black text-white tracking-tighter">
                            {m.homeScore} - {m.awayScore}
                          </div>
                          <div className={`text-xs font-bold mt-1 ${m.status === 'live' ? 'text-red-500 animate-pulse' : 'text-slate-500'}`}>
                            {m.status === 'live' ? 'LIVE' : 'FT'}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full">VS</div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 w-20">
                      <span className="text-4xl filter drop-shadow-md">{m.awayFlag}</span>
                      <span className="font-black text-white tracking-tight">{getAbbr(m.awayTeam)}</span>
                      <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">{m.awayTeam}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#0A1128]/50 border-t border-white/5 p-3 text-center">
                  <span className="text-xs font-medium italic text-slate-500">No prediction made</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Arenas page
function ArenasPage() {
  const [arenas, setArenas] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const [joinCode, setJoinCode] = useState('')
  const [newArenaName, setNewArenaName] = useState('')

  const load = () => api('/api/arenas').then(r => setArenas(r.arenas || r)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const join = async () => {
    try {
      const data = await api(`/api/arenas/join/${joinCode.trim().toUpperCase()}`, { method: 'POST' })
      toast('success', `Joined ${data.arenaName}! 🏟️`)
      setJoinCode('')
      load()
    } catch (err) {
      toast('error', 'Could not join', err.message)
    }
  }

  const createArena = async () => {
    if (!newArenaName.trim()) return
    try {
      await api('/api/admin/arenas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newArenaName })
      })
      toast('success', 'Arena created!')
      setNewArenaName('')
      load()
    } catch (err) {
      toast('error', 'Failed', err.message)
    }
  }

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  return (
    <div className="page-content">
      <div className="page-title">🏟️ Arenas</div>
      <div className="page-sub">Private groups with their own leaderboards.</div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">Join an Arena</div>
        <div className="card-body" style={{ display: 'flex', gap: 8 }}>
          <input className="form-input" placeholder="Invite code (e.g. ABC12345)" value={joinCode} onChange={e => setJoinCode(e.target.value)} style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={join} disabled={!joinCode.trim()}>Join</button>
        </div>
      </div>

      {user?.isAdmin && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">⚡ Create Arena (Admin)</div>
          <div className="card-body" style={{ display: 'flex', gap: 8 }}>
            <input className="form-input" placeholder="Arena name" value={newArenaName} onChange={e => setNewArenaName(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-primary" onClick={createArena} disabled={!newArenaName.trim()}>Create</button>
          </div>
        </div>
      )}

      <div className="arenas-grid">
        {arenas.map(a => (
          <div key={a.id} className="arena-card">
            <div className="arena-name">{a.name}</div>
            <div className="arena-meta">{a.memberCount} member{a.memberCount !== 1 ? 's' : ''}</div>
            {a.isMember && a.inviteCode && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 4 }}>Invite code:</div>
                <code style={{ background: 'var(--surface2)', padding: '3px 8px', borderRadius: 6, fontSize: '0.85rem', letterSpacing: 2 }}>{a.inviteCode}</code>
              </div>
            )}
            {a.isMember && <span className="open-badge" style={{ marginTop: 8, display: 'inline-flex' }}>✓ Member</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Admin page
function AdminPage() {
  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])
  const [activeTab, setActiveTab] = useState('rounds')
  const [resultInputs, setResultInputs] = useState({})
  const { toast } = useToast()

  const load = () => Promise.all([api('/api/matches').then(r=>r.matches||r), api('/api/rounds').then(r=>r.rounds||r)]).then(([m, r]) => { setMatches(m); setRounds(r) })
  useEffect(() => { load() }, [])

  const setMatchStatus = async (matchId, status) => {
    try {
      await api(`/api/admin/matches/${matchId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      toast('success', `Match marked as ${status}`)
      load()
    } catch (err) {
      toast('error', 'Failed', err.message)
    }
  }

  const setResult = async (matchId) => {
    const r = resultInputs[matchId]
    if (!r || r.home === undefined || r.away === undefined) return
    try {
      await api(`/api/admin/matches/${matchId}/result`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeScore: parseInt(r.home), awayScore: parseInt(r.away) })
      })
      toast('success', 'Result saved! Points calculated.')
      load()
    } catch (err) {
      toast('error', 'Failed', err.message)
    }
  }

  const lockRound = async (roundSlug, lock) => {
    const roundMatches = matches.filter(m => {
      if (roundSlug === 'group_stage_1') return m.stage === 'group_stage' && m.matchDay === 1
      if (roundSlug === 'group_stage_2') return m.stage === 'group_stage' && m.matchDay >= 2
      return m.stage === roundSlug
    })
    for (const m of roundMatches) {
      await api(`/api/admin/matches/${m.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: lock ? 'live' : 'scheduled' })
      })
    }
    toast('success', lock ? '🔒 Round locked' : '🔓 Round unlocked')
    load()
  }

  const roundMatchMap = {
    group_stage_1: matches.filter(m => m.stage === 'group_stage' && m.matchDay === 1),
    group_stage_2: matches.filter(m => m.stage === 'group_stage' && m.matchDay >= 2),
  }

  return (
    <div className="page-content">
      <div className="page-title">⚙️ Admin Panel</div>
      <div className="page-sub">Manage rounds, matches and results.</div>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'rounds' ? 'active' : ''}`} onClick={() => setActiveTab('rounds')}>Rounds</button>
        <button className={`tab-btn ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>Matches</button>
      </div>

      {activeTab === 'rounds' && (
        <div>
          {rounds.map(r => (
            <div key={r.slug} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                    {r.isLocked ? '🔒 Locked' : '🟢 Open'}
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => lockRound(r.slug, !r.isLocked)}>
                  {r.isLocked ? '🔓 Unlock' : '🔒 Lock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'matches' && (
        <div>
          {matches.map(m => (
            <div key={m.id} className="card" style={{ marginBottom: 10 }}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span>{m.homeFlag}</span>
                  <div style={{ flex: 1, fontWeight: 700 }}>{m.homeTeam} vs {m.awayTeam}</div>
                  <span>{m.awayFlag}</span>
                  <span className={`status-pill status-${m.status}`}>{m.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setMatchStatus(m.id, 'scheduled')} disabled={m.status === 'scheduled'}>Scheduled</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setMatchStatus(m.id, 'live')} disabled={m.status === 'live'}>Live</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setMatchStatus(m.id, 'completed')} disabled={m.status === 'completed'}>Completed</button>
                </div>
                {m.status === 'completed' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
                    <input type="number" min="0" max="20" className="score-input" style={{ width: 48, height: 40, fontSize: '1rem' }}
                      value={resultInputs[m.id]?.home ?? m.homeScore ?? ''}
                      onChange={e => setResultInputs(v => ({ ...v, [m.id]: { ...v[m.id], home: e.target.value } }))} placeholder="0" />
                    <span style={{ color: 'var(--muted)', fontWeight: 700 }}>–</span>
                    <input type="number" min="0" max="20" className="score-input" style={{ width: 48, height: 40, fontSize: '1rem' }}
                      value={resultInputs[m.id]?.away ?? m.awayScore ?? ''}
                      onChange={e => setResultInputs(v => ({ ...v, [m.id]: { ...v[m.id], away: e.target.value } }))} placeholder="0" />
                    <button className="btn btn-primary btn-sm" onClick={() => setResult(m.id)}>Save Result</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Main App
export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [page, setPage] = useState('home')
  const [toasts, setToasts] = useState([])

  const toast = useCallback((type, title, message) => {
    const id = Date.now()
    setToasts(t => [...t, { id, type, title, message }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  useEffect(() => {
    api('/api/auth/user').then(d => setUser(d.user || null)).catch(() => setUser(null)).finally(() => setAuthLoading(false))
  }, [])

  const login = useCallback((u) => setUser(u), [])
  const logout = useCallback(async () => {
    await api('/api/auth/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
  }, [])

  if (authLoading) return <div className="loading-center" style={{ height: '100vh' }}><div className="spinner" /></div>

  const pages = { home: HomePage, predictions: PredictionsPage, leaderboard: LeaderboardPage, matches: MatchesPage, arenas: ArenasPage, admin: AdminPage }
  const PageComponent = pages[page] || HomePage

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <ToastContext.Provider value={{ toast }}>
        {!user ? (
          <AuthPage />
        ) : (
          <div className="app">
            <Sidebar page={page} setPage={setPage} />
            <main className="main">
              <PageComponent />
            </main>
          </div>
        )}
        <Toasts toasts={toasts} />
      </ToastContext.Provider>
    </AuthContext.Provider>
  )
}
