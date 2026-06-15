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
    { id: 'predictions', icon: '⚽', label: 'Predictions' },
    { id: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
    { id: 'arenas', icon: '🏟️', label: 'Arenas' },
    { id: 'matches', icon: '📅', label: 'Matches' },
    ...(user?.isAdmin ? [{ id: 'admin', icon: '⚙️', label: 'Admin Panel' }] : []),
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span>🏆</span> Jibran's Draft
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-link ${page === item.id ? 'active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-name">{user.displayName}</div>
          <div className="sidebar-user-email">{user.email}</div>
          {user.isAdmin && <div className="admin-badge">⚡ ADMIN</div>}
          <button className="btn-logout" onClick={logout}>Sign out</button>
        </div>
      )}
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
        <div className="auth-logo">🏆 Jibran's FIFA Fantasy Draft</div>
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
      // Init scores from existing predictions
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

  return (
    <div className="page-content">
      <div className="page-title">⚽ Predictions</div>
      <div className="page-sub">Submit your score predictions before each round locks.</div>

      <div className="tabs">
        {rounds.slice(0, 4).map(r => (
          <button key={r.slug} className={`tab-btn ${activeRound === r.slug ? 'active' : ''}`} onClick={() => setActiveRound(r.slug)}>
            {r.slug === 'group_stage_1' ? 'Week 1' : r.slug === 'group_stage_2' ? 'Week 2' : r.name}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        {user?.isAdmin ? (
          <span className="admin-override-badge">⚡ Admin — Lock bypassed</span>
        ) : isLocked ? (
          <span className="lock-badge">🔒 Round Locked</span>
        ) : (
          <span className="open-badge">🟢 Open for Predictions</span>
        )}
      </div>

      {roundMatches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <div className="empty-title">No matches in this round yet</div>
        </div>
      ) : roundMatches.map(match => {
        const s = scores[match.id] || {}
        const hasPred = match.userPrediction || (s.home !== undefined && s.away !== undefined && s.home !== '' && s.away !== '')
        const canEdit = user?.isAdmin || !isLocked

        return (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <div>
                <div className="match-stage">Group {match.groupName} · {match.stage === 'group_stage' ? `Matchday ${match.matchDay}` : match.stage}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`status-pill status-${match.status}`}>{match.status}</span>
                <span className="match-time">{new Date(match.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="match-teams">
              <div className="team">
                <span className="team-flag">{match.homeFlag}</span>
                <span className="team-name">{match.homeTeam}</span>
              </div>
              <div className="match-vs">VS</div>
              <div className="team">
                <span className="team-flag">{match.awayFlag}</span>
                <span className="team-name">{match.awayTeam}</span>
              </div>
            </div>

            {match.status === 'completed' && match.homeScore !== null && (
              <div className="match-score-display">{match.homeScore} – {match.awayScore}</div>
            )}

            <div className="prediction-section">
              {canEdit ? (
                <>
                  <div className="prediction-inputs">
                    <input
                      type="number" min="0" max="20" className="score-input"
                      value={s.home ?? match.userPrediction?.homeScore ?? ''}
                      onChange={e => setScore(match.id, 'home', e.target.value)}
                      placeholder="0"
                    />
                    <span className="score-sep">–</span>
                    <input
                      type="number" min="0" max="20" className="score-input"
                      value={s.away ?? match.userPrediction?.awayScore ?? ''}
                      onChange={e => setScore(match.id, 'away', e.target.value)}
                      placeholder="0"
                    />
                    <button
                      className="save-btn"
                      onClick={() => saveScore(match.id)}
                      disabled={saving[match.id]}
                    >
                      {saving[match.id] ? '...' : 'Save'}
                    </button>
                  </div>
                  {match.userPrediction && (
                    <div className="saved-prediction">
                      Current: <strong>{match.userPrediction.homeScore} – {match.userPrediction.awayScore}</strong>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {match.userPrediction
                    ? <span>Your prediction: <strong style={{ color: 'var(--text)' }}>{match.userPrediction.homeScore} – {match.userPrediction.awayScore}</strong></span>
                    : '🔒 Round locked — no prediction submitted'
                  }
                </div>
              )}
            </div>
          </div>
        )
      })}
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

  const medals = ['🥇', '🥈', '🥉']

  if (loading) return <div className="loading-center"><div className="spinner" /></div>

  return (
    <div className="page-content">
      <div className="page-title">🏆 Leaderboard</div>
      <div className="page-sub">Rankings based on prediction accuracy.</div>
      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏆</div>
          <div className="empty-title">No scores yet</div>
          <div>Results will appear once matches are complete.</div>
        </div>
      ) : data.map((p, i) => (
        <div key={p.userId} className={`leaderboard-row ${i < 3 ? `top-${i+1}` : ''}`}>
          <div className="rank-num">
            {i < 3 ? <span className="rank-medal">{medals[i]}</span> : `#${p.rank}`}
          </div>
          <div className="player-name">
            {p.username}
            {p.userId === user?.id && <span style={{ color: 'var(--primary)', fontSize: '0.75rem', marginLeft: 6 }}>(you)</span>}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
              {p.exactScores}🎯 {p.correctOutcomes}✓
            </div>
            <div className="pts-badge">{p.totalPoints} pts</div>
          </div>
        </div>
      ))}
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
    const g = m.groupName || m.stage
    if (!groups[g]) groups[g] = []
    groups[g].push(m)
  })

  return (
    <div className="page-content">
      <div className="page-title">📅 Matches</div>
      <div className="page-sub">Full World Cup 2026 schedule.</div>
      {Object.entries(groups).map(([g, gMatches]) => (
        <div key={g} style={{ marginBottom: 24 }}>
          <div className="section-header">
            <div className="section-title">Group {g}</div>
          </div>
          {gMatches.map(m => (
            <div key={m.id} className="admin-match-row">
              <span style={{ fontSize: '1.3rem' }}>{m.homeFlag}</span>
              <div className="admin-match-teams">{m.homeTeam} vs {m.awayTeam}</div>
              <span style={{ fontSize: '1.3rem' }}>{m.awayFlag}</span>
              <div className="admin-match-time">{new Date(m.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
              <span className={`status-pill status-${m.status}`}>{m.status}</span>
              {m.status === 'completed' && m.homeScore !== null && (
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{m.homeScore}–{m.awayScore}</span>
              )}
            </div>
          ))}
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
  const [page, setPage] = useState('predictions')
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

  const pages = { predictions: PredictionsPage, leaderboard: LeaderboardPage, matches: MatchesPage, arenas: ArenasPage, admin: AdminPage }
  const PageComponent = pages[page] || PredictionsPage

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
