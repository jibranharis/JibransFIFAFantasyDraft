import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { users, formatUser } from '../db.js';

const router = Router();

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.get((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  req.session.userId = user.id;
  return res.json({ user: formatUser(user) });
});

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return res.status(400).json({ error: 'Email, password, and displayName are required.' });
  }

  const existing = users.get((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const newUser = users.insert({
    id: uuidv4(),
    email,
    password_hash,
    display_name: displayName,
    is_admin: false,
    profile_image: null,
    created_at: new Date().toISOString(),
  });

  req.session.userId = newUser.id;
  return res.status(201).json({ user: formatUser(newUser) });
});

// POST /auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to destroy session.' });
    }
    res.clearCookie('connect.sid');
    return res.json({ ok: true });
  });
});

// GET /auth/user
router.get('/user', (req, res) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  return res.json({ user: formatUser(req.user) });
});

export default router;
