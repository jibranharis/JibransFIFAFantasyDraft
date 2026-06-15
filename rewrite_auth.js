import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add supabase import
content = content.replace("import { BrowserRouter, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom'",
`import { BrowserRouter, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'`);

// 2. Remove api function completely
content = content.replace(/async function api\(path, opts = \{\}\) \{[\s\S]*?\n\}\n/, '');

// 3. Update AuthPage submit
content = content.replace(/const submit = async \(e\) => \{[\s\S]*?finally \{\s*setLoading\(false\)\s*\}\s*\}/,
`const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(form.email, form.password, mode === 'register', form.displayName)
      toast('success', mode === 'login' ? 'Welcome back!' : 'Account created!', \`Signed in as \${form.displayName || form.email}\`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }`);

// 4. Update App component auth loading
content = content.replace(/const \[user, setUser\] = useState\(null\)[\s\S]*?const logout = useCallback\(async \(\) => \{[\s\S]*?\}, \[\]\)/,
`const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [toasts, setToasts] = useState([])

  const toast = useCallback((type, title, message) => {
    const id = Date.now()
    setToasts(t => [...t, { id, type, title, message }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
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
  }, [])`);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated auth logic');
