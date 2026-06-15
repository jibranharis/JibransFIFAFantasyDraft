import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

import { connectDB } from './db.js'; // initializes data on startup
import { startAutomatedLiveScores } from './services/liveScores.js';
import authRoutes from './routes/auth.js';
import matchRoutes from './routes/matches.js';
import predictionRoutes from './routes/predictions.js';
import leaderboardRoutes from './routes/leaderboard.js';
import roundsRoutes from './routes/rounds.js';
import adminRoutes from './routes/admin.js';
import arenasRoutes from './routes/arenas.js';

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
  cookie: {
    secure: isProd,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/rounds', roundsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/arenas', arenasRoutes);

// Serve frontend in production
if (isProd) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const distPath = join(__dirname, '../dist');
  
  if (!existsSync(distPath)) {
    console.warn('⚠️ Frontend dist directory not found. Did you run npm run build?');
  }
  
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(join(distPath, 'index.html')));
}

connectDB().then(() => {
  startAutomatedLiveScores();
  app.listen(PORT, () => {
    console.log(`🏆 Jibran's FIFA Fantasy Draft running on http://localhost:${PORT}`);
  });
});
