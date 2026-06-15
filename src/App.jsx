import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import './design.css'

// ============================================================
// Context
// ============================================================
const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)
const ToastContext = createContext(null)
export const useToast = () => useContext(ToastContext)

// ============================================================
// API helper
// ============================================================
async function api(path, opts = {}) {
  const res = await fetch(path, { credentials: 'include', ...opts })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

// ============================================================
// Utility
// ============================================================
function getAbbr(team) {
  if (!team || team.startsWith('Team ')) return 'TBD'
  if (team.toUpperCase() === 'USA') return 'USA'
  if (team.toUpperCase() === 'SOUTH KOREA') return 'KOR'
  if (team.toUpperCase() === 'SOUTH AFRICA') return 'RSA'
  if (team.toUpperCase() === 'IVORY COAST') return 'CIV'
  if (team.toUpperCase() === 'UNITED STATES') return 'USA'
  if (team.toUpperCase() === 'CZECHIA') return 'CZE'
  if (team.toUpperCase() === 'BOSNIA AND HERZEGOVINA') return 'BIH'
  if (team.toUpperCase() === 'TÜRKIYE') return 'TUR'
  if (team.toUpperCase() === 'CURAÇAO') return 'CUW'
  return team.substring(0, 3).toUpperCase()
}

const STAGE_ORDER = { group_stage: 1, round_of_32: 2, round_of_16: 3, quarterfinals: 4, semifinals: 5, final: 6 }
const STAGE_LABELS = { group_stage: 'Group Stage', round_of_32: 'Round of 32', round_of_16: 'Round of 16', quarterfinals: 'Quarterfinals', semifinals: 'Semifinals', final: 'Final' }

function stageLabel(stage) {
  return STAGE_LABELS[stage] || (stage || '').replace(/_/g, ' ')
}

// ============================================================
// Toasts
// ============================================================
function Toasts({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="toast-title">{t.title}</div>
          {t.message && <div className="toast-msg">{t.message}</div>}
        </div>
      ))}
    </div>
  )
}

// ============================================================
// SVG Icons (Lucide-style, matching reference)
// ============================================================
const IconHome     = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconStar     = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
const IconUsers    = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconTrophy   = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
const IconShield   = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconBarChart = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
const IconLogOut   = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
const IconChevron  = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
const IconInfo     = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>

// ============================================================
// Sidebar
// ============================================================
function SidebarContent({ onNavClick }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  
  const navItems = [
    { path: '/',           icon: <IconHome />,     label: 'Home' },
    { path: '/predictions',icon: <IconStar />,     label: 'Predictions' },
    { path: '/matches',    icon: <IconCalendar />, label: 'Schedule' },
    { path: '/groups',     icon: <IconUsers />,    label: 'Groups' },
    { path: '/leaderboard',icon: <IconTrophy />,   label: 'Leaderboard' },
    { path: '/arenas',     icon: <IconShield />,   label: 'Arenas' },
    ...(!user?.isAdmin && user ? [{ path: '/my-results', icon: <IconBarChart />, label: 'My Results' }] : []),
    ...(user?.isAdmin ? [{ path: '/admin', icon: <IconSettings />, label: 'Admin Panel' }] : []),
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand" onClick={onNavClick}>
          <div className="sidebar-brand-icon">⚽</div>
          <div>
            <div className="sidebar-brand-name">Fútbol is Life</div>
            <div className="sidebar-brand-sub">WC 2026 Predictions</div>
          </div>
        </Link>
      </div>

      <div className="sidebar-rainbow" />

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavClick}
            className={`sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {isActive(item.path) && <span className="nav-chevron"><IconChevron /></span>}
          </Link>
        ))}

        <div className="sidebar-nav-divider">
          <button
            className="sidebar-nav-link"
            onClick={() => {
              if (onNavClick) onNavClick()
            }}
          >
            <span className="nav-icon"><IconInfo /></span>
            How to Play
          </button>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-trophy-card">
          <img
            className="sidebar-trophy-img"
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=400"
            alt=""
          />
          <div className="sidebar-trophy-overlay-1" />
          <div className="sidebar-trophy-overlay-2" />
          <div className="sidebar-trophy-text">USA · CANADA · MEXICO</div>
        </div>

        {user && (
          <div className="sidebar-user-block">
            <div className="sidebar-user-avatar">
              {user.displayName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.displayName}</div>
              <div className="sidebar-user-email">{user.email}</div>
            </div>
          </div>
        )}
        {user && (
          <button className="sidebar-signout-btn" onClick={logout}>
            <span className="nav-icon"><IconLogOut /></span>
            Sign out
          </button>
        )}
      </div>
    </>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarContent />
    </aside>
  )
}

function MobileSidebar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="mobile-menu-btn" onClick={() => setOpen(true)}>☰</button>
      {open && (
        <>
          <div className="mobile-sidebar-overlay" onClick={() => setOpen(false)} />
          <div className="mobile-sidebar">
            <SidebarContent onNavClick={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}

// ============================================================
// Auth Page
// ============================================================
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
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo-wrap">
          <div className="auth-logo-icon">🏆</div>
          <h1 className="auth-logo-title">Fútbol is Life</h1>
          <p className="auth-logo-sub">World Cup 2026 Predictions</p>
        </div>

        <form onSubmit={submit} className="auth-form">
          {mode === 'register' && (
            <div>
              <label className="form-field-label">Display Name</label>
              <input className="form-input" placeholder="Your name" value={form.displayName} onChange={set('displayName')} required />
            </div>
          )}
          <div>
            <label className="form-field-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div>
            <label className="form-field-label">Password</label>
            <input className="form-input" type="password" placeholder="Password" value={form.password} onChange={set('password')} required minLength={mode === 'register' ? 6 : 1} />
          </div>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8 }}>
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

// ============================================================
// Home page
// ============================================================
function HomePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ rank: null, totalPoints: 0, exactScores: 0, predictions: 0 })
  const [recentCompleted, setRecentCompleted] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topPredictors, setTopPredictors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api('/api/matches').then(r => r.matches || r),
      api('/api/leaderboard').then(r => r.leaderboard || r),
    ]).then(([matches, lb]) => {
      setRecentCompleted(matches.filter(m => m.status === 'completed' && m.userPrediction).slice(0, 5))
      setUpcoming(matches.filter(m => m.status === 'scheduled').slice(0, 3))
      setTopPredictors(lb.slice(0, 5))
      const me = lb.find(p => p.userId === user?.id)
      if (me) setStats({ rank: me.rank, totalPoints: me.totalPoints || 0, exactScores: me.exactScores || 0, predictions: me.predictionsCount || 0 })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [user?.id])

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  return (
    <div style={{ padding: '32px', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.875rem', fontWeight: 900, letterSpacing: '-0.025em', color: 'hsl(var(--foreground))', marginBottom: 4 }}>
          Welcome back, {user?.displayName}
        </h1>
        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
          Track your predictions and see how you stack up.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Global Rank', value: stats.rank ? `#${stats.rank}` : '—' },
          { label: 'Total Points', value: stats.totalPoints },
          { label: 'Exact Scores', value: stats.exactScores },
          { label: 'Predictions', value: stats.predictions },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))', marginBottom: 8 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: 'hsl(var(--foreground))' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent */}
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.125rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'hsl(var(--foreground))', marginBottom: 12 }}>
            Recent Predictions
          </h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {recentCompleted.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                No completed predictions yet.
              </div>
            ) : recentCompleted.map(m => (
              <div key={m.id} style={{ padding: '12px 16px', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))', fontSize: '0.875rem' }}>
                  {m.homeFlag} {getAbbr(m.homeTeam)} vs {getAbbr(m.awayTeam)} {m.awayFlag}
                </span>
                <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.8rem' }}>
                  {m.userPrediction?.homeScore}–{m.userPrediction?.awayScore}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top predictors */}
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.125rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'hsl(var(--foreground))', marginBottom: 12 }}>
            Top Predictors
          </h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {topPredictors.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                No predictions yet.
              </div>
            ) : topPredictors.map((p, i) => (
              <div key={p.userId} style={{ padding: '12px 16px', borderBottom: '1px solid hsl(var(--border) / 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, flexShrink: 0, background: i===0?'hsl(var(--primary))':i===1?'rgba(148,163,184,0.3)':i===2?'rgba(217,119,6,0.3)':'rgba(255,255,255,0.1)', color: i===0?'hsl(var(--primary-foreground))':'hsl(var(--foreground))' }}>
                    {i+1}
                  </div>
                  <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))', fontSize: '0.875rem' }}>{p.username}</span>
                </div>
                <span style={{ fontWeight: 900, color: 'hsl(var(--foreground))', fontSize: '0.875rem', fontFamily: 'Outfit, sans-serif' }}>
                  {p.totalPoints} <span style={{ fontWeight: 400, color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem' }}>pts</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Match Card
// ============================================================
function MatchCard({ match }) {
  const isCompleted = match.status === 'completed'
  const isLive = match.status === 'live'
  const hasScore = isCompleted || isLive

  const groupLabel = match.groupName ? `Group ${match.groupName}` : (match.stage ? stageLabel(match.stage) : '')
  const dateStr = match.scheduledAt
    ? new Date(match.scheduledAt).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div className="match-card">
      <div className="match-card-header">
        <div className="match-card-date">{dateStr}</div>
        {groupLabel && <div className="match-card-badge">{groupLabel}</div>}
      </div>

      <div className="match-card-teams">
        <div className="match-team">
          <span className="match-team-flag">{match.homeFlag || '🏳️'}</span>
          <span className="match-team-code">{getAbbr(match.homeTeam)}</span>
          <span className="match-team-name">{match.homeTeam}</span>
        </div>

        <div className="match-score-center">
          {hasScore ? (
            <>
              <div className="match-score-value">{match.homeScore} – {match.awayScore}</div>
              {isLive ? (
                <div className="match-score-live">● LIVE</div>
              ) : (
                <div className="match-score-ft">FT</div>
              )}
            </>
          ) : (
            <div className="match-vs">VS</div>
          )}
        </div>

        <div className="match-team">
          <span className="match-team-flag">{match.awayFlag || '🏳️'}</span>
          <span className="match-team-code">{getAbbr(match.awayTeam)}</span>
          <span className="match-team-name">{match.awayTeam}</span>
        </div>
      </div>

      <div className="match-card-footer">
        {match.userPrediction ? (
          <div className="match-prediction-result">
            Your pick: <strong>{match.userPrediction.homeScore}–{match.userPrediction.awayScore}</strong>
            {isCompleted && match.userPrediction.points != null && (
              <span style={{ marginLeft: 8, color: match.userPrediction.points > 0 ? 'hsl(142 71% 45%)' : 'hsl(var(--muted-foreground))' }}>
                +{match.userPrediction.points}pts
              </span>
            )}
          </div>
        ) : (
          <div className="match-prediction-text">No prediction made</div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// Matches (Schedule) page
// ============================================================
function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStage, setActiveStage] = useState(null)

  useEffect(() => {
    api('/api/matches')
      .then(r => {
        const m = r.matches || r
        setMatches(m)
        if (m.length > 0) setActiveStage(m[0].stage || 'group_stage')
      })
      .finally(() => setLoading(false))
  }, [])

  const stageGroups = useMemo(() => {
    const map = new Map()
    for (const m of matches) {
      const s = m.stage || 'group_stage'
      if (!map.has(s)) map.set(s, [])
      map.get(s).push(m)
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => (STAGE_ORDER[a] ?? 99) - (STAGE_ORDER[b] ?? 99))
      .map(([stage, ms]) => ({ stage, matches: ms }))
  }, [matches])

  const completedCount = matches.filter(m => m.status === 'completed').length
  const total = matches.length

  if (loading) return (
    <div style={{ padding: '32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="card" style={{ height: 220, borderRadius: 12, opacity: 0.4 }} />
        ))}
      </div>
    </div>
  )

  const currentGroup = stageGroups.find(g => g.stage === activeStage) || stageGroups[0]

  return (
    <div style={{ padding: '32px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Schedule</h1>
          <p className="page-subtitle">All {total} World Cup matches by round.</p>
        </div>
        {total > 0 && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'hsl(var(--primary))', fontFamily: 'Outfit, sans-serif' }}>
              {completedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
              of {total} played
            </div>
          </div>
        )}
      </div>

      {/* Stage tabs */}
      {stageGroups.length > 0 && (
        <div className="stage-tabs" style={{ marginBottom: 24 }}>
          {stageGroups.map(({ stage, matches: sm }) => {
            const completed = sm.filter(m => m.status === 'completed').length
            const live = sm.filter(m => m.status === 'live').length
            return (
              <button
                key={stage}
                className={`stage-tab ${activeStage === stage ? 'active' : ''}`}
                onClick={() => setActiveStage(stage)}
              >
                {stageLabel(stage)}
                {live > 0 && <span className="live-badge">{live} LIVE</span>}
                {live === 0 && completed > 0 && <span className="count-badge">{completed}/{sm.length}</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* Matches grid */}
      {currentGroup && (
        <div>
          <div className="stage-section-header">
            <IconCalendar />
            <h2 className="stage-section-title">{stageLabel(currentGroup.stage)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {currentGroup.matches.filter(m => m.status === 'live').length > 0 && (
                <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700, padding: '2px 8px', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 4 }}>
                  {currentGroup.matches.filter(m => m.status === 'live').length} LIVE
                </span>
              )}
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                {currentGroup.matches.filter(m => m.status === 'completed').length}/{currentGroup.matches.length} played
              </span>
            </div>
            <div className="stage-section-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 16 }}>
              <div className="matches-grid">
              {currentGroup.matches.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        </div>
      )}

      {stageGroups.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <p>No matches found.</p>
        </div>
      )}
    </div>
  )
}

// ============================================================
// Predictions page
// ============================================================
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

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  const predictedCount = roundMatches.filter(m => scores[m.id]?.home !== undefined).length

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Predictions</h1>
        <p className="page-subtitle">Predict every score before each window locks.</p>
      </div>

      {/* Round tabs */}
      <div className="stage-tabs" style={{ marginBottom: 24 }}>
        {rounds.slice(0, 6).map(r => (
          <button
            key={r.slug}
            className={`stage-tab ${activeRound === r.slug ? 'active' : ''}`}
            onClick={() => setActiveRound(r.slug)}
          >
            {r.slug === 'group_stage_1' ? 'Week 1' : r.slug === 'group_stage_2' ? 'Week 2' : r.name}
            {activeRound === r.slug && (
              <span className="count-badge">{predictedCount}/{roundMatches.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Round header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'hsl(var(--foreground))' }}>
          {currentRound?.slug === 'group_stage_1' ? 'WEEK 1' : currentRound?.slug === 'group_stage_2' ? 'WEEK 2' : currentRound?.name}
        </h2>
        {user?.isAdmin ? (
          <span style={{ background: 'rgba(234,179,8,0.2)', color: 'hsl(43 96% 60%)', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(234,179,8,0.3)' }}>⚡ Admin Override</span>
        ) : isLocked ? (
          <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(239,68,68,0.25)' }}>LOCKED</span>
        ) : (
          <span style={{ background: 'rgba(34,197,94,0.15)', color: 'hsl(142 71% 45%)', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(34,197,94,0.25)' }}>OPEN</span>
        )}
      </div>

      {isLocked && !user?.isAdmin && (
        <div className="card" style={{ padding: 16, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center', borderColor: 'rgba(239,68,68,0.2)' }}>
          <span>🔒</span>
          <div>
            <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.875rem' }}>Predictions closed</div>
            <div style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem' }}>+1 pt correct outcome · +3 pts exact score</div>
          </div>
        </div>
      )}

      {roundMatches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚽</div>
          <p>No matches in this round yet.</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {roundMatches.map(match => {
            const s = scores[match.id] || {}
            const canEdit = user?.isAdmin || !isLocked

            return (
              <div key={match.id} className="prediction-row">
                <div className="pred-time">
                  {match.scheduledAt ? new Date(match.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                </div>

                <div className="pred-teams">
                  <div className="pred-team-side home">
                    <span className="pred-team-code">{getAbbr(match.homeTeam)}</span>
                    <span className="pred-team-flag">{match.homeFlag}</span>
                  </div>

                  <div className="pred-score-center">
                    {canEdit ? (
                      <div className="pred-score-inputs">
                        <input
                          type="number" min="0" max="20"
                          className="pred-score-input"
                          value={s.home ?? match.userPrediction?.homeScore ?? ''}
                          onChange={e => setScore(match.id, 'home', e.target.value)}
                          placeholder="0"
                        />
                        <span className="pred-score-sep">–</span>
                        <input
                          type="number" min="0" max="20"
                          className="pred-score-input"
                          value={s.away ?? match.userPrediction?.awayScore ?? ''}
                          onChange={e => setScore(match.id, 'away', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    ) : (
                      <div className="pred-score-display">
                        {match.userPrediction ? `${match.userPrediction.homeScore}–${match.userPrediction.awayScore}` : '–'}
                      </div>
                    )}
                    <div style={{ fontSize: '0.625rem', color: 'hsl(var(--muted-foreground))', fontWeight: 700, letterSpacing: '0.1em' }}>
                      {match.status === 'completed' ? 'FT' : match.status === 'live' ? '🔴 LIVE' : ''}
                    </div>
                  </div>

                  <div className="pred-team-side away">
                    <span className="pred-team-flag">{match.awayFlag}</span>
                    <span className="pred-team-code">{getAbbr(match.awayTeam)}</span>
                  </div>
                </div>

                <div style={{ width: 80, flexShrink: 0, textAlign: 'center' }}>
                  {canEdit ? (
                    <button
                      className="pred-save-btn"
                      onClick={() => saveScore(match.id)}
                      disabled={saving[match.id]}
                    >
                      {saving[match.id] ? '...' : 'SAVE'}
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.625rem', color: 'hsl(var(--muted-foreground))', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {match.userPrediction ? 'PREDICTED' : 'NO PICK'}
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

// ============================================================
// Leaderboard page
// ============================================================
function LeaderboardPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    api('/api/leaderboard').then(r => setData(r.leaderboard || r)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">How do you stack up against the rest?</p>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <p>No scores yet. Make predictions to get started!</p>
        </div>
      ) : (
        <>
          {top3.length > 0 && (
            <div className="podium-grid" style={{ marginBottom: 32 }}>
              {top3.map(p => {
                const isMe = p.userId === user?.id
                const medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'
                return (
                  <div key={p.userId} className={`podium-card ${p.rank===1?'gold':p.rank===2?'silver':'bronze'}`}>
                    {isMe && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'hsl(var(--primary))' }} />}
                    <div style={{ fontSize: '2rem' }}>{medal}</div>
                    <div style={{ fontWeight: 900, fontSize: '1rem', color: 'hsl(var(--foreground))', fontFamily: 'Outfit, sans-serif', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.username}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--foreground))' }}>
                      {p.totalPoints} <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'hsl(var(--muted-foreground))' }}>pts</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 4, color: 'hsl(var(--foreground))' }}>{p.exactScores} 🎯</span>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 4, color: 'hsl(var(--foreground))' }}>{p.correctOutcomes} ✓</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(var(--muted-foreground))' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'center', width: 64 }}>Rank</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Player</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Preds</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Correct</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Exact</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(p => {
                    const isMe = p.userId === user?.id
                    return (
                      <tr key={p.userId} style={{ background: isMe ? 'rgba(255,255,255,0.04)' : 'transparent', borderTop: '1px solid hsl(var(--border) / 0.5)', transition: 'background 0.1s' }}>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span style={{ fontWeight: 900, color: p.rank <= 3 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
                            {p.rank}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 700, color: 'hsl(var(--foreground))' }}>{p.username}</span>
                          {isMe && <span style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', fontSize: '0.5rem', fontWeight: 900, padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>You</span>}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.predictionsCount}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.correctOutcomes}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.exactScores}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 900, color: 'hsl(var(--foreground))', fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>{p.totalPoints}</td>
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

// ============================================================
// Groups page
// ============================================================
function GroupsPage() {
  return (
    <div style={{ padding: '32px', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Groups</h1>
        <p className="page-subtitle">World Cup 2026 Group Standings.</p>
      </div>
      <div className="empty-state">
        <div className="empty-state-icon">⚽</div>
        <p>Group standings will appear here once the tournament begins.</p>
      </div>
    </div>
  )
}

// ============================================================
// My Results page
// ============================================================
function MyResultsPage() {
  return (
    <div style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">My Results</h1>
        <p className="page-subtitle">Your historical prediction accuracy.</p>
      </div>
      <div className="empty-state">
        <div className="empty-state-icon">📈</div>
        <p>Make predictions and wait for matches to complete to see your stats.</p>
      </div>
    </div>
  )
}

// ============================================================
// Arenas page
// ============================================================
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
      setJoinCode(''); load()
    } catch (err) {
      toast('error', 'Could not join', err.message)
    }
  }

  const createArena = async () => {
    if (!newArenaName.trim()) return
    try {
      await api('/api/admin/arenas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newArenaName }) })
      toast('success', 'Arena created!')
      setNewArenaName(''); load()
    } catch (err) {
      toast('error', 'Failed', err.message)
    }
  }

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  return (
    <div style={{ padding: '32px', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Arenas</h1>
        <p className="page-subtitle">Private groups with their own leaderboards.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'hsl(var(--foreground))', marginBottom: 12 }}>Join an Arena</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="form-input" style={{ flex: 1 }} placeholder="Invite code (e.g. ABC12345)" value={joinCode} onChange={e => setJoinCode(e.target.value)} />
            <button className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }} onClick={join} disabled={!joinCode.trim()}>Join</button>
          </div>
        </div>

        {user?.isAdmin && (
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'hsl(var(--foreground))', marginBottom: 12 }}>Create Arena <span style={{ color: 'hsl(var(--primary))' }}>⚡ Admin</span></h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" style={{ flex: 1 }} placeholder="Arena name" value={newArenaName} onChange={e => setNewArenaName(e.target.value)} />
              <button className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }} onClick={createArena} disabled={!newArenaName.trim()}>Create</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {arenas.map(a => (
          <div key={a.id} className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, hsl(var(--primary)), hsl(43 80% 45%))' }} />
            <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'hsl(var(--foreground))', fontFamily: 'Outfit, sans-serif', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
            <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: 12 }}>{a.memberCount} member{a.memberCount !== 1 ? 's' : ''}</div>
            {a.isMember && <span style={{ fontSize: '0.625rem', background: 'rgba(34,197,94,0.2)', color: 'hsl(142 71% 45%)', fontWeight: 900, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(34,197,94,0.3)' }}>✓ Member</span>}
            {a.isMember && a.inviteCode && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: '0.625rem', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Invite Code</div>
                <code style={{ display: 'block', textAlign: 'center', padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6, color: 'hsl(var(--primary))', fontFamily: 'monospace', letterSpacing: '0.2em', fontWeight: 700 }}>{a.inviteCode}</code>
              </div>
            )}
          </div>
        ))}
        {arenas.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-state-icon">🏟️</div>
            <p>No arenas yet. Create one or join with an invite code.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================
// Admin page
// ============================================================
function AdminPage() {
  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])
  const [activeTab, setActiveTab] = useState('rounds')
  const [resultInputs, setResultInputs] = useState({})
  const { toast } = useToast()

  const load = () => Promise.all([
    api('/api/matches').then(r => r.matches || r),
    api('/api/rounds').then(r => r.rounds || r)
  ]).then(([m, r]) => { setMatches(m); setRounds(r) })
  useEffect(() => { load() }, [])

  const setMatchStatus = async (matchId, status) => {
    try {
      await api(`/api/admin/matches/${matchId}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
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
      await api(`/api/admin/matches/${matchId}/result`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ homeScore: parseInt(r.home), awayScore: parseInt(r.away) }) })
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
      await api(`/api/admin/matches/${m.id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: lock ? 'live' : 'scheduled' }) })
    }
    toast('success', lock ? '🔒 Round locked' : '🔓 Round unlocked')
    load()
  }

  return (
    <div style={{ padding: '32px', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtitle">Manage rounds, matches and results.</p>
      </div>

      <div className="stage-tabs" style={{ marginBottom: 24 }}>
        <button className={`stage-tab ${activeTab === 'rounds' ? 'active' : ''}`} onClick={() => setActiveTab('rounds')}>Rounds</button>
        <button className={`stage-tab ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>Matches</button>
      </div>

      {activeTab === 'rounds' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rounds.map(r => (
            <div key={r.slug} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'hsl(var(--foreground))' }}>{r.name}</div>
                <div style={{ fontSize: '0.75rem', color: r.isLocked ? '#f87171' : 'hsl(142 71% 45%)', fontWeight: 700, marginTop: 2 }}>
                  {r.isLocked ? '🔒 LOCKED' : '🟢 OPEN'}
                </div>
              </div>
              <button
                className="btn-ghost"
                style={{ borderColor: r.isLocked ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)', color: r.isLocked ? 'hsl(142 71% 45%)' : '#f87171' }}
                onClick={() => lockRound(r.slug, !r.isLocked)}
              >
                {r.isLocked ? '🔓 UNLOCK' : '🔒 LOCK'}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'matches' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {matches.map(m => (
            <div key={m.id} className="card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: '1.5rem' }}>{m.homeFlag}</span>
                <div style={{ flex: 1, fontWeight: 700, color: 'hsl(var(--foreground))' }}>{m.homeTeam} vs {m.awayTeam}</div>
                <span style={{ fontSize: '1.5rem' }}>{m.awayFlag}</span>
                <span style={{ fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: m.status==='completed'?'rgba(148,163,184,0.15)':m.status==='live'?'rgba(239,68,68,0.15)':'rgba(34,197,94,0.15)', color: m.status==='completed'?'hsl(var(--muted-foreground))':m.status==='live'?'#f87171':'hsl(142 71% 45%)' }}>{m.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {['scheduled','live','completed'].map(s => (
                  <button key={s} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '4px 12px', background: m.status===s?'rgba(255,255,255,0.1)':'transparent' }} onClick={() => setMatchStatus(m.id, s)} disabled={m.status===s}>{s}</button>
                ))}
              </div>
              {m.status === 'completed' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
                  <input type="number" min="0" max="20" className="score-input"
                    value={resultInputs[m.id]?.home ?? m.homeScore ?? ''}
                    onChange={e => setResultInputs(v => ({ ...v, [m.id]: { ...v[m.id], home: e.target.value } }))} placeholder="0" />
                  <span style={{ color: 'hsl(var(--muted-foreground))', fontWeight: 700 }}>–</span>
                  <input type="number" min="0" max="20" className="score-input"
                    value={resultInputs[m.id]?.away ?? m.awayScore ?? ''}
                    onChange={e => setResultInputs(v => ({ ...v, [m.id]: { ...v[m.id], away: e.target.value } }))} placeholder="0" />
                  <button className="btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.875rem' }} onClick={() => setResult(m.id)}>Save Result</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
// App Layout
// ============================================================
function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <MobileSidebar />
      <div className="main-content">
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/matches"     element={<MatchesPage />} />
          <Route path="/groups"      element={<GroupsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/arenas"      element={<ArenasPage />} />
          <Route path="/my-results"  element={<MyResultsPage />} />
          <Route path="/admin"       element={<AdminPage />} />
          <Route path="*"            element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

// ============================================================
// Root App
// ============================================================
export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
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

  if (authLoading) return <div className="spinner-screen"><div className="spinner" /></div>

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, login, logout }}>
        <ToastContext.Provider value={{ toast }}>
          {!user ? (
            <Routes>
              <Route path="*" element={<AuthPage />} />
            </Routes>
          ) : (
            <AppLayout />
          )}
          <Toasts toasts={toasts} />
        </ToastContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
