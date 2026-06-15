import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
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

const MONGO_URI = process.env.MONGO_URI;

app.use(session({
  secret: process.env.SESSION_SECRET || 'futbol-is-life-secret-2026',
  resave: false,
  saveUninitialized: false,
  // Persist sessions in MongoDB if available, otherwise fallback to memory
  store: MONGO_URI ? MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: 'sessions',
    ttl: 30 * 24 * 60 * 60, // 30 days in seconds
    autoRemove: 'native',
  }) : undefined,
  cookie: {
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in ms
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
