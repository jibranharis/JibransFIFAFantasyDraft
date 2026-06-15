import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

import { connectDB } from './db.js'; // initializes data on startup
import authRoutes from './routes/auth.js';
import matchRoutes from './routes/matches.js';
import predictionRoutes from './routes/predictions.js';
import roundRoutes from './routes/rounds.js';
import leaderboardRoutes from './routes/leaderboard.js';
import arenaRoutes from './routes/arenas.js';
import adminRoutes from './routes/admin.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors({ origin: isProd ? false : 'http://localhost:3001', credentials: true }));
app.use(express.json());
// Trust the Render reverse proxy so secure cookies work
app.set('trust proxy', 1);

app.use(session({
  secret: 'futbol-is-life-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Attach user to request from session
app.use((req, res, next) => {
  if (req.session.userId) {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
    req.user = user || null;
  } else {
    req.user = null;
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/arenas', arenaRoutes);
app.use('/api/admin', adminRoutes);

// Serve built frontend in production
const distPath = join(__dirname, '..', 'dist');
if (isProd && existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(join(distPath, 'index.html')));
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🏆 Jibran's FIFA Fantasy Draft running on http://localhost:${PORT}`);
  });
});
