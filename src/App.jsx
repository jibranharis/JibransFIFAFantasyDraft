import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

function getFlagUrl(emoji) {
  if (!emoji) return null;
  const overrides = { '🏴󠁧󠁢󠁳󠁣󠁴󠁿': 'gb-sct', '🏴󠁧󠁢󠁥󠁮󠁧󠁿': 'gb-eng', '🏴󠁧󠁢󠁷󠁬󠁳󠁿': 'gb-wls' };
  if (overrides[emoji]) return `https://flagcdn.com/w40/${overrides[emoji]}.png`;
  if (emoji.length < 4) return null;
  const a = emoji.codePointAt(0);
  const b = emoji.codePointAt(2);
  if (a >= 0x1F1E6 && a <= 0x1F1FF && b >= 0x1F1E6 && b <= 0x1F1FF) {
    const code = String.fromCharCode(a - 0x1F1E6 + 97) + String.fromCharCode(b - 0x1F1E6 + 97);
    return `https://flagcdn.com/w40/${code}.png`;
  }
  return null;
}

const formatMatch = m => ({ ...m, homeTeam: m.home_team, awayTeam: m.away_team, homeFlag: m.home_flag, awayFlag: m.away_flag, homeFlagUrl: getFlagUrl(m.home_flag), awayFlagUrl: getFlagUrl(m.away_flag), homeScore: m.home_score, awayScore: m.away_score, groupName: m.group_name, scheduledAt: m.scheduled_at, matchDay: m.match_day })
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

function stageLabel(slug) {
  const map = {
    'group_stage': 'Group Stage',
    'round_of_32': 'Round of 32',
    'round_of_16': 'Round of 16',
    'quarter_finals': 'Quarterfinals',
    'semi_finals': 'Semifinals',
    'final': 'Final',
    'third_place': 'Third Place'
  }
  return map[slug] || slug
}

const STAGE_ORDER = {
  'group_stage': 1,
  'round_of_32': 2,
  'round_of_16': 3,
  'quarterfinals': 4,
  'semifinals': 5,
  'third_place': 6,
  'final': 7
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
    { path: '/leaderboard',icon: <IconTrophy />,   label: 'Leaderboard' },
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
      await login(form.email, form.password, mode === 'register', form.displayName)
      toast('success', mode === 'login' ? 'Welcome back!' : 'Account created!', `Signed in as ${form.displayName || form.email}`)
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
function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState('')
  
  useEffect(() => {
    const update = () => {
      const now = new Date().getTime()
      const diff = deadline - now
      if (diff <= 0) {
        setTimeLeft('Predictions Closed')
        return
      }
      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft(`${h}h ${m}m ${s}s`)
    }
    update()
    const int = setInterval(update, 1000)
    return () => clearInterval(int)
  }, [deadline])

  return <span style={{ fontFamily: 'monospace', fontSize: '1.1em', background: 'rgba(255,193,7,0.15)', padding: '2px 6px', borderRadius: 4, color: '#FFC107' }}>{timeLeft}</span>
}

function HomePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ rank: null, totalPoints: 0, exactScores: 0, predictions: 0 })
  const [recentCompleted, setRecentCompleted] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topPredictors, setTopPredictors] = useState([])
  const [loading, setLoading] = useState(true)

  const [arenas, setArenas] = useState([])

  useEffect(() => {
    Promise.all([
      supabase.from('matches').select('*').order('scheduled_at', { ascending: true }),
      supabase.from('leaderboard').select('*').order('total_points', { ascending: false }),
      supabase.from('arenas').select('*, arena_members(user_id)')
    ]).then(([{data: matches}, {data: lb}, {data: a}]) => {
      matches = (matches || []).map(formatMatch)
      lb = lb || []
      const arenasData = (a || []).map(ar => ({ ...ar, isMember: ar.arena_members.some(m => m.user_id === user?.id), membersCount: ar.arena_members.length }))
      // TODO: get user predictions to map recentCompleted
      supabase.from('predictions').select('*').eq('user_id', user?.id).then(({data: myPreds}) => {
        const pMap = (myPreds || []).reduce((acc, p) => ({ ...acc, [p.match_id]: { ...p, homeScore: p.home_score, awayScore: p.away_score } }), {})
        const matchesWithPreds = matches.map(m => ({ ...m, userPrediction: pMap[m.id] }))
        
        setRecentCompleted(matchesWithPreds.filter(m => m.status === 'completed' && m.userPrediction).slice(0, 5))
        setUpcoming(matchesWithPreds.filter(m => m.status === 'scheduled').slice(0, 3))
        setTopPredictors((lb || []).map(l => ({ ...l, userId: l.user_id, username: l.display_name, totalPoints: l.total_points, exactScores: l.exact_scores, predictionsCount: l.predictions_count })).slice(0, 5))
        const me = lb.find(p => p.user_id === user?.id)
        if (me) setStats({ rank: lb.findIndex(x => x.user_id === user?.id) + 1, totalPoints: me.total_points || 0, exactScores: me.exact_scores || 0, predictions: me.predictions_count || 0 })
      }).finally(() => setLoading(false))
    })
  }, [user?.id])

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  const futureGames = upcoming.filter(m => new Date(m.scheduledAt).getTime() - 60 * 60 * 1000 > new Date().getTime())
  const nextGame = futureGames[0]
  const nextDeadline = nextGame ? new Date(nextGame.scheduledAt).getTime() - 60 * 60 * 1000 : null

  return (
    <div style={{ padding: '32px', maxWidth: 1024, margin: '0 auto' }}>
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.875rem', fontWeight: 900, letterSpacing: '-0.025em', color: 'hsl(var(--foreground))', marginBottom: 4 }}>
            Welcome back, {user?.displayName}
          </h1>
          <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
            World Cup 2026 — here's how you're doing.
          </p>
        </div>
        <Link to="/predictions" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', fontSize: '0.875rem', width: 'auto' }}>
          <span>◎</span> Predictions
        </Link>
      </div>

      <div style={{ background: 'linear-gradient(180deg, rgba(255,193,7,0.1) 0%, rgba(255,193,7,0.02) 100%)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: 12, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ color: '#FFC107', fontSize: '1.5rem' }}>⏱️</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'hsl(var(--foreground))', marginBottom: 6 }}>
              {nextDeadline ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  Next prediction locks in: <CountdownTimer deadline={nextDeadline} />
                </div>
              ) : (
                <span>No upcoming matches to predict.</span>
              )}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{stats.predictions}/104 predicted</div>
          </div>
        </div>
        <Link to="/predictions" className="btn-ghost" style={{ border: '1px solid hsl(var(--border))', background: 'transparent' }}>◎ Predict</Link>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'GLOBAL RANK', value: stats.rank ? `#${stats.rank}` : '—', icon: '🏆', accent: false },
          { label: 'TOTAL POINTS', value: stats.totalPoints, icon: '⭐', accent: true },
          { label: 'EXACT SCORES', value: stats.exactScores, icon: '🎯', accent: false },
          { label: 'PREDICTIONS', value: stats.predictions, icon: '☑️', accent: false },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 20, border: s.accent ? '1px solid #FFC107' : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '1rem', color: s.accent ? '#FFC107' : 'hsl(var(--muted-foreground))' }}>{s.icon}</div>
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: 900, color: s.accent ? '#FFC107' : 'hsl(var(--foreground))' }}>
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
                <span style={{ fontWeight: 600, color: 'hsl(var(--foreground))', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {m.homeFlagUrl ? <img src={m.homeFlagUrl} alt={m.homeFlag} style={{ width: 16 }} /> : m.homeFlag} {getAbbr(m.homeTeam)} vs {getAbbr(m.awayTeam)} {m.awayFlagUrl ? <img src={m.awayFlagUrl} alt={m.awayFlag} style={{ width: 16 }} /> : m.awayFlag}
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

  const groupLabel = stageLabel(match.stage || 'group_stage').toUpperCase()
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
          {match.homeFlagUrl ? (
            <img src={match.homeFlagUrl} alt={match.homeFlag} className="match-team-flag" style={{ width: '2em', height: '1.5em', objectFit: 'cover', borderRadius: '2px' }} />
          ) : (
            <span className="match-team-flag">{match.homeFlag || '🏳️'}</span>
          )}
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
          {match.awayFlagUrl ? (
            <img src={match.awayFlagUrl} alt={match.awayFlag} className="match-team-flag" style={{ width: '2em', height: '1.5em', objectFit: 'cover', borderRadius: '2px' }} />
          ) : (
            <span className="match-team-flag">{match.awayFlag || '🏳️'}</span>
          )}
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
    supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => ({ matches: (r.data || []).map(formatMatch) }))
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
const ROUNDS = [
  { slug: 'group_stage', name: 'Group Stage' },
  { slug: 'round_of_32', name: 'Round of 32' },
  { slug: 'round_of_16', name: 'Round of 16' },
  { slug: 'quarterfinals', name: 'Quarterfinals' },
  { slug: 'semifinals', name: 'Semifinals' },
  { slug: 'final', name: 'Final' }
]

function PredictionsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [matches, setMatches] = useState([])
  const [activeRound, setActiveRound] = useState('group_stage')
  const [scores, setScores] = useState({})
  const [saving, setSaving] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('matches').select('*').order('scheduled_at', { ascending: true }),
      supabase.from('predictions').select('*').eq('user_id', user?.id)
    ]).then(([mRes, pRes]) => {
      const pMap = {}
      ;(pRes.data || []).forEach(p => { pMap[p.match_id] = p })

      const m = (mRes.data || []).map(formatMatch).map(match => ({
        ...match,
        userPrediction: pMap[match.id] ? { homeScore: pMap[match.id].home_score, awayScore: pMap[match.id].away_score } : null
      }))
      setMatches(m)
      
      const init = {}
      m.forEach(match => {
        if (match.userPrediction) {
          init[match.id] = { home: match.userPrediction.homeScore, away: match.userPrediction.awayScore }
        }
      })
      setScores(init)
    }).finally(() => setLoading(false))
  }, [user?.id])

  const roundMatches = matches.filter(m => m.stage === activeRound)

  const currentRound = ROUNDS.find(r => r.slug === activeRound)

  const [isSavingAll, setIsSavingAll] = useState(false)

  const saveAllScores = async () => {
    const toUpsert = []
    
    for (const match of roundMatches) {
      const matchId = match.id
      const s = scores[matchId] || {}
      const p = match.userPrediction || {}
      
      const finalHome = s.home !== undefined ? s.home : p.homeScore
      const finalAway = s.away !== undefined ? s.away : p.awayScore
      
      if (finalHome !== undefined && finalAway !== undefined && finalHome !== '' && finalAway !== '') {
        toUpsert.push({
          user_id: user.id,
          match_id: parseInt(matchId),
          home_score: parseInt(finalHome),
          away_score: parseInt(finalAway)
        })
      }
    }

    if (toUpsert.length === 0) {
      toast('success', 'Predictions saved! ⚽')
      return
    }

    setIsSavingAll(true)
    try {
      const { error } = await supabase.from('predictions').upsert(toUpsert, { onConflict: 'user_id,match_id' })
      if (error) throw error
      toast('success', 'Predictions saved! ⚽')
    } catch (err) {
      toast('error', `Failed to save: ${err.message}`)
    } finally {
      setIsSavingAll(false)
    }
  }

  const setScore = (matchId, side, val) => {
    setScores(v => ({ ...v, [matchId]: { ...v[matchId], [side]: val } }))
  }

  const getAccuracyClass = (match) => {
    if (match.status === 'scheduled' || !match.userPrediction) return ''
    const hp = match.userPrediction.homeScore
    const ap = match.userPrediction.awayScore
    const ha = match.homeScore ?? 0
    const aa = match.awayScore ?? 0
    
    if (hp === ha && ap === aa) return 'correct-exact'
    if ((hp > ap && ha > aa) || (hp < ap && ha < aa) || (hp === ap && ha === aa)) return 'correct-outcome'
    return ''
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
        {ROUNDS.map(r => (
          <button
            key={r.slug}
            className={`stage-tab ${activeRound === r.slug ? 'active' : ''}`}
            onClick={() => setActiveRound(r.slug)}
          >
            {r.name}
            {activeRound === r.slug && roundMatches.length > 0 && (
              <span className="count-badge">{predictedCount}/{roundMatches.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Round header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.025em', color: 'hsl(var(--foreground))' }}>
            {currentRound?.name}
          </h2>
          {user?.isAdmin && (
            <span style={{ background: 'rgba(234,179,8,0.2)', color: 'hsl(43 96% 60%)', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', padding: '2px 8px', borderRadius: 4, border: '1px solid rgba(234,179,8,0.3)' }}>⚡ Admin Override</span>
          )}
        </div>
        
        {roundMatches.length > 0 && (
          <button 
            className="global-save-btn" 
            onClick={saveAllScores}
            disabled={isSavingAll}
          >
            {isSavingAll ? 'Saving...' : 'Save Predictions'}
          </button>
        )}
      </div>

      {roundMatches.length === 0 ? (
        <div className="empty-state" style={{ padding: '64px 32px' }}>
          <div className="empty-state-icon" style={{ fontSize: '3rem', opacity: 0.5 }}>📅</div>
          <p style={{ marginTop: 16, color: 'hsl(var(--muted-foreground))', fontSize: '1.1rem' }}>Knockout matches will appear here once the bracket is drawn.</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {roundMatches.map(match => {
            const s = scores[match.id] || {}
            const isMatchLocked = new Date().getTime() > new Date(match.scheduledAt).getTime() - 60 * 60 * 1000

            return (
              <div key={match.id} className="prediction-row">
                <div className="pred-time">
                  {match.scheduledAt ? new Date(match.scheduledAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                </div>

                <div className="pred-teams">
                  <div className="pred-team-side home">
                    {match.homeFlagUrl ? (
                      <img src={match.homeFlagUrl} alt={match.homeFlag} className="pred-team-flag" style={{ width: '1.5em', height: '1.1em', objectFit: 'cover', borderRadius: '2px' }} />
                    ) : (
                      <span className="pred-team-flag">{match.homeFlag}</span>
                    )}
                    <span className="pred-team-code">{getAbbr(match.homeTeam)}</span>
                  </div>

                  <div className="pred-center">
                    {match.status !== 'scheduled' ? (
                      <div className="pred-center-score">{match.homeScore ?? 0}–{match.awayScore ?? 0}</div>
                    ) : (
                      <div className="pred-center-pill">vs</div>
                    )}
                  </div>

                  <div className="pred-team-side away">
                    <span className="pred-team-code">{getAbbr(match.awayTeam)}</span>
                    {match.awayFlagUrl ? (
                      <img src={match.awayFlagUrl} alt={match.awayFlag} className="pred-team-flag" style={{ width: '1.5em', height: '1.1em', objectFit: 'cover', borderRadius: '2px' }} />
                    ) : (
                      <span className="pred-team-flag">{match.awayFlag}</span>
                    )}
                  </div>
                </div>

                <div className="pred-right-action">
                  {!isMatchLocked ? (
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
                    <div className={['pred-locked-score', getAccuracyClass(match)].filter(Boolean).join(' ')}>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6, marginRight: 2 }}>🔒</span>
                      {match.userPrediction ? `${match.userPrediction.homeScore} - ${match.userPrediction.awayScore}` : '–'}
                    </div>
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
    supabase.from('leaderboard').select('*').order('total_points', { ascending: false }).then(r => setData((r.data || []).map(l => ({ ...l, userId: l.user_id, displayName: l.display_name, totalPoints: l.total_points, exactScores: l.exact_scores, predictionsCount: l.predictions_count })))).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  const top3 = data.slice(0, 3)
  const rest = data.slice(3)

  return (
    <div style={{ padding: '32px', maxWidth: 1100, margin: '0 auto' }}>
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
                    <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem', fontWeight: 700, marginTop: 8 }}>
                      <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 6, color: 'hsl(var(--foreground))' }}>{p.exactScores} 🎯</span>
                      <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 6, color: 'hsl(var(--foreground))' }}>{p.correctOutcomes} ✓</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--muted-foreground))' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'center', width: 80 }}>Rank</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left' }}>Player</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center' }}>Preds</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center' }}>Correct</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center' }}>Exact</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(p => {
                    const isMe = p.userId === user?.id
                    return (
                      <tr key={p.userId} style={{ background: isMe ? 'rgba(255,255,255,0.04)' : 'transparent', borderTop: '1px solid hsl(var(--border) / 0.5)', transition: 'background 0.1s' }}>
                        <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                          <span style={{ fontWeight: 900, color: p.rank <= 3 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))', fontSize: '1.1rem' }}>
                            {p.rank}
                          </span>
                        </td>
                        <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontWeight: 700, color: 'hsl(var(--foreground))', fontSize: '1rem' }}>{p.username}</span>
                          {isMe && <span style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', fontSize: '0.6rem', fontWeight: 900, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>You</span>}
                        </td>
                        <td style={{ padding: '20px 24px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.predictionsCount}</td>
                        <td style={{ padding: '20px 24px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.correctOutcomes}</td>
                        <td style={{ padding: '20px 24px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{p.exactScores}</td>
                        <td style={{ padding: '20px 24px', textAlign: 'right', fontWeight: 900, color: 'hsl(var(--foreground))', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>{p.totalPoints}</td>
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
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('matches').select('*').eq('stage', 'group_stage').then(r => {
      setMatches((r.data || []).map(formatMatch))
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner-screen"><div className="spinner" /></div>

  const groups = {}
  matches.forEach(m => {
    const g = m.groupName || 'Group A'
    if (!groups[g]) groups[g] = {}
    
    if (!groups[g][m.homeTeam] && m.homeTeam) groups[g][m.homeTeam] = { name: m.homeTeam, flag: m.homeFlag, flagUrl: m.homeFlagUrl, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    if (!groups[g][m.awayTeam] && m.awayTeam) groups[g][m.awayTeam] = { name: m.awayTeam, flag: m.awayFlag, flagUrl: m.awayFlagUrl, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }

    if (m.status === 'completed') {
      const ht = groups[g][m.homeTeam]
      const at = groups[g][m.awayTeam]
      ht.p++; at.p++;
      ht.gf += m.homeScore; ht.ga += m.awayScore;
      at.gf += m.awayScore; at.ga += m.homeScore;
      ht.gd = ht.gf - ht.ga; at.gd = at.gf - at.ga;
      
      if (m.homeScore > m.awayScore) { ht.w++; ht.pts += 3; at.l++; }
      else if (m.homeScore < m.awayScore) { at.w++; at.pts += 3; ht.l++; }
      else { ht.d++; at.d++; ht.pts += 1; at.pts += 1; }
    }
  })

  const sortedGroups = Object.entries(groups).sort((a,b) => a[0].localeCompare(b[0])).map(([name, teams]) => {
    const sortedTeams = Object.values(teams).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return a.name.localeCompare(b.name);
    })
    return { name, teams: sortedTeams }
  })

  return (
    <div style={{ padding: '32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Groups</h1>
        <p className="page-subtitle">Standings across all 12 groups.</p>
      </div>

      {sortedGroups.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⚽</div>
          <p>Group standings will appear here once the tournament begins.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: 24 }}>
          {sortedGroups.map(g => (
            <div key={g.name} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--foreground))' }}>
                {g.name.toUpperCase()}
              </div>
              <div style={{ overflowX: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'hsl(var(--muted-foreground))', fontSize: '0.75rem' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'center', width: 24 }}>#</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left' }}>Team</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center', width: 28 }}>P</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center', width: 28 }}>W</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center', width: 28 }}>D</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center', width: 28 }}>L</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center', width: 32 }}>GD</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', width: 32, color: '#FFC107', fontWeight: 900 }}>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.teams.map((t, i) => (
                      <tr key={t.name} style={{ borderTop: '1px solid hsl(var(--border) / 0.5)' }}>
                        <td style={{ padding: '16px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{i + 1}</td>
                        <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, color: 'hsl(var(--foreground))', whiteSpace: 'nowrap' }}>
                          {t.flagUrl ? <img src={t.flagUrl} alt="" style={{ width: 24, height: 16, objectFit: 'cover', borderRadius: 2 }} /> : <span>{t.flag}</span>}
                          {t.name}
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{t.p}</td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{t.w}</td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{t.d}</td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', color: 'hsl(var(--muted-foreground))' }}>{t.l}</td>
                        <td style={{ padding: '16px 12px', textAlign: 'center', color: 'hsl(var(--foreground))' }}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                        <td style={{ padding: '16px', textAlign: 'center', fontWeight: 900, color: '#FFC107', fontSize: '1.1rem' }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
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

  const load = () => supabase.from('arenas').select('*, profiles!arenas_owner_id_fkey(display_name), arena_members(user_id)').then(r => {
      const formatted = (r.data || []).map(a => ({ ...a, ownerName: a.profiles?.display_name, membersCount: a.arena_members.length, isMember: a.arena_members.some(m => m.user_id === user?.id) }))
      setArenas(formatted)
    }).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const join = async () => {
    try {
      const { data: arena } = await supabase.from('arenas').select('id, name').eq('code', joinCode.trim().toUpperCase()).single()
      if (!arena) throw new Error('Arena not found')
      const { error } = await supabase.from('arena_members').insert({ arena_id: arena.id, user_id: user.id })
      if (error) throw error
      toast('success', `Joined ${arena.name}! 🏟️`)
      setJoinCode(''); load()
    } catch (err) {
      toast('error', 'Could not join', err.message)
    }
  }

  const createArena = async () => {
    if (!newArenaName.trim()) return
    try {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      const { data, error } = await supabase.from('arenas').insert({ id: crypto.randomUUID(), name: newArenaName, owner_id: user.id, code }).select().single()
      if (error) throw error
      await supabase.from('arena_members').insert({ arena_id: data.id, user_id: user.id })
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
            {a.isMember && a.code && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: '0.625rem', color: 'hsl(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Invite Link</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <code style={{ flex: 1, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6, color: 'hsl(var(--primary))', fontFamily: 'monospace', letterSpacing: '0.05em', fontWeight: 700 }}>
                    {window.location.origin}/join/{a.code}
                  </code>
                  <button className="btn-ghost" style={{ padding: '8px', width: 'auto' }} onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/join/${a.code}`);
                    toast('success', 'Copied to clipboard!');
                  }}>Copy</button>
                </div>
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
// Join Arena Route Handle
// ============================================================
function JoinArenaPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (code) {
      supabase.from('arenas').select('id').eq('code', code.trim().toUpperCase()).single().then(({data: arena}) => {
        if (!arena) throw new Error('Arena not found')
        return supabase.from('arena_members').insert({ arena_id: arena.id, user_id: user.id })
      })
        .then(data => {
          toast('success', `Joined ${data.arenaName}! 🏟️`);
        })
        .catch(err => {
          toast('error', 'Could not join', err.message);
        })
        .finally(() => {
          navigate('/arenas');
        });
    } else {
      navigate('/arenas');
    }
  }, [code, navigate, toast]);

  return <div className="spinner-screen"><div className="spinner" /></div>;
}

// ============================================================
// Admin page
// ============================================================
function AdminPage() {
  const [matches, setMatches] = useState([])
  const [rounds, setRounds] = useState([])
  const [allPredictions, setAllPredictions] = useState([])
  const [activeTab, setActiveTab] = useState('rounds')
  const [resultInputs, setResultInputs] = useState({})
  const { toast } = useToast()

  const load = () => Promise.all([
    supabase.from('matches').select('*').order('scheduled_at', { ascending: true }).then(r => r.data || []),
    Promise.resolve([]),
    supabase.from('profiles').select('id, display_name, email, predictions(match_id, home_score, away_score)').then(r => {
      return (r.data || []).map(u => ({ id: u.id, username: u.display_name || 'User', email: u.email || 'No email', predictions: u.predictions.map(p => ({ matchId: p.match_id, homeScore: p.home_score, awayScore: p.away_score })) }))
    })
  ]).then(([m, r, p]) => { setMatches(m); setRounds(r); setAllPredictions(p); })
  useEffect(() => { load() }, [])

  const setMatchStatus = async (matchId, status) => {
    try {
      await supabase.from('matches').update({ status }).eq('id', matchId)
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
      await supabase.from('matches').update({ home_score: parseInt(r.home), away_score: parseInt(r.away) }).eq('id', matchId)
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
      await supabase.from('matches').update({ status: lock ? 'live' : 'scheduled' }).eq('id', m.id)
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
        <button className={`stage-tab ${activeTab === 'predictions' ? 'active' : ''}`} onClick={() => setActiveTab('predictions')}>User Predictions</button>
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
                {m.homeFlagUrl ? <img src={m.homeFlagUrl} alt={m.homeFlag} style={{ width: 24 }} /> : <span style={{ fontSize: '1.5rem' }}>{m.homeFlag}</span>}
                <div style={{ flex: 1, fontWeight: 700, color: 'hsl(var(--foreground))' }}>{m.homeTeam} vs {m.awayTeam}</div>
                {m.awayFlagUrl ? <img src={m.awayFlagUrl} alt={m.awayFlag} style={{ width: 24 }} /> : <span style={{ fontSize: '1.5rem' }}>{m.awayFlag}</span>}
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

      {activeTab === 'predictions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {allPredictions.length === 0 ? (
            <div className="empty-state">No predictions found.</div>
          ) : allPredictions.map(u => (
            <div key={u.id} className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '1px solid hsl(var(--border))', paddingBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'hsl(var(--foreground))' }}>{u.username}</div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{u.email} • {u.predictions.length} predictions</div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {u.predictions.map(p => (
                  <div key={p.id} style={{ background: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 8 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'hsl(var(--muted-foreground))', marginBottom: 4 }}>
                      {getAbbr(p.match?.homeTeam)} vs {getAbbr(p.match?.awayTeam)}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'hsl(var(--foreground))', fontFamily: 'Outfit, sans-serif' }}>
                      {p.homeScore} – {p.awayScore}
                    </div>
                    {p.points !== null && (
                      <div style={{ fontSize: '0.75rem', color: p.points > 0 ? 'hsl(142 71% 45%)' : '#f87171', fontWeight: 700, marginTop: 4 }}>
                        +{p.points} pts
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
          <Route path="/leaderboard" element={<LeaderboardPage />} />
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { ...session.user, displayName: session.user.user_metadata?.display_name, isAdmin: session.user.email === 'admin@futbol.com' || session.user.email?.includes('admin') } : null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { ...session.user, displayName: session.user.user_metadata?.display_name, isAdmin: session.user.email === 'admin@futbol.com' || session.user.email?.includes('admin') } : null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email, password, isRegister, displayName) => {
    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })
      if (error) throw error
      return data.user
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data.user
    }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
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
