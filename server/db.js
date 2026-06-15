import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'data.json');

function load() {
  if (!existsSync(DB_PATH)) return defaultData();
  try { return JSON.parse(readFileSync(DB_PATH, 'utf8')); }
  catch { return defaultData(); }
}

function defaultData() {
  return { users: [], sessions: [], matches: [], rounds: [], predictions: [], arenas: [], arena_members: [] };
}

function save(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Live data store
let data = load();

// Generic collection helpers
function col(name) {
  return {
    all: () => data[name],
    find: (fn) => data[name].filter(fn),
    get: (fn) => data[name].find(fn),
    insert: (item) => { data[name].push(item); save(data); return item; },
    update: (fn, patch) => {
      data[name] = data[name].map(r => fn(r) ? { ...r, ...patch } : r);
      save(data); return data[name].find(fn);
    },
    delete: (fn) => { data[name] = data[name].filter(r => !fn(r)); save(data); },
    count: (fn) => (fn ? data[name].filter(fn) : data[name]).length,
  };
}

export const users = col('users');
export const sessions = col('sessions');
export const matches = col('matches');
export const rounds = col('rounds');
export const predictions = col('predictions');
export const arenas = col('arenas');
export const arenaMembers = col('arena_members');

// Seed once
function seed() {
  // Admin user
  if (!users.get(u => u.email === 'jibran.haris@gmail.com')) {
    users.insert({
      id: uuidv4(),
      email: 'jibran.haris@gmail.com',
      password_hash: bcrypt.hashSync('admin123', 10),
      display_name: 'Jibran Ali Haris',
      is_admin: true,
      profile_image: null,
      created_at: new Date().toISOString()
    });
    console.log('✅ Admin created: jibran.haris@gmail.com / admin123');
  }

  // Rounds
  const roundData = [
    { slug: 'group_stage_1', name: 'Group Stage – Week 1', locks_at: null, is_locked: false },
    { slug: 'group_stage_2', name: 'Group Stage – Week 2', locks_at: null, is_locked: false },
    { slug: 'round_of_32',   name: 'Round of 32',          locks_at: null, is_locked: false },
    { slug: 'round_of_16',   name: 'Round of 16',          locks_at: null, is_locked: false },
    { slug: 'quarter_final', name: 'Quarter Finals',        locks_at: null, is_locked: false },
    { slug: 'semi_final',    name: 'Semi Finals',           locks_at: null, is_locked: false },
    { slug: 'final',         name: 'Final',                 locks_at: null, is_locked: false },
  ];
  for (const r of roundData) {
    if (!rounds.get(x => x.slug === r.slug)) rounds.insert(r);
  }

  // Matches (World Cup 2026 Group Stage)
  if (matches.all().length === 0) {
    let id = 1;
    const ms = [
      { home_team:'Mexico',      away_team:'Ecuador',      home_flag:'🇲🇽', away_flag:'🇪🇨', stage:'group_stage', match_day:1, scheduled_at:'2026-06-11T23:00:00.000Z', group_name:'A' },
      { home_team:'USA',         away_team:'Canada',       home_flag:'🇺🇸', away_flag:'🇨🇦', stage:'group_stage', match_day:1, scheduled_at:'2026-06-12T02:00:00.000Z', group_name:'B' },
      { home_team:'Argentina',   away_team:'Nigeria',      home_flag:'🇦🇷', away_flag:'🇳🇬', stage:'group_stage', match_day:1, scheduled_at:'2026-06-12T18:00:00.000Z', group_name:'C' },
      { home_team:'Brazil',      away_team:'Germany',      home_flag:'🇧🇷', away_flag:'🇩🇪', stage:'group_stage', match_day:1, scheduled_at:'2026-06-12T21:00:00.000Z', group_name:'D' },
      { home_team:'France',      away_team:'Belgium',      home_flag:'🇫🇷', away_flag:'🇧🇪', stage:'group_stage', match_day:1, scheduled_at:'2026-06-13T18:00:00.000Z', group_name:'E' },
      { home_team:'Spain',       away_team:'Portugal',     home_flag:'🇪🇸', away_flag:'🇵🇹', stage:'group_stage', match_day:1, scheduled_at:'2026-06-13T21:00:00.000Z', group_name:'F' },
      { home_team:'England',     away_team:'Netherlands',  home_flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', away_flag:'🇳🇱', stage:'group_stage', match_day:1, scheduled_at:'2026-06-14T18:00:00.000Z', group_name:'G' },
      { home_team:'Japan',       away_team:'South Korea',  home_flag:'🇯🇵', away_flag:'🇰🇷', stage:'group_stage', match_day:1, scheduled_at:'2026-06-14T21:00:00.000Z', group_name:'H' },
      { home_team:'Ivory Coast', away_team:'Ecuador',      home_flag:'🇨🇮', away_flag:'🇪🇨', stage:'group_stage', match_day:1, scheduled_at:'2026-06-14T23:00:00.000Z', group_name:'A' },
      { home_team:'Morocco',     away_team:'Senegal',      home_flag:'🇲🇦', away_flag:'🇸🇳', stage:'group_stage', match_day:1, scheduled_at:'2026-06-15T18:00:00.000Z', group_name:'I' },
      { home_team:'Colombia',    away_team:'Venezuela',    home_flag:'🇨🇴', away_flag:'🇻🇪', stage:'group_stage', match_day:1, scheduled_at:'2026-06-16T18:00:00.000Z', group_name:'B' },
      { home_team:'Ecuador',     away_team:'USA',          home_flag:'🇪🇨', away_flag:'🇺🇸', stage:'group_stage', match_day:2, scheduled_at:'2026-06-19T18:00:00.000Z', group_name:'A' },
      { home_team:'Canada',      away_team:'Argentina',    home_flag:'🇨🇦', away_flag:'🇦🇷', stage:'group_stage', match_day:2, scheduled_at:'2026-06-19T21:00:00.000Z', group_name:'C' },
      { home_team:'Germany',     away_team:'France',       home_flag:'🇩🇪', away_flag:'🇫🇷', stage:'group_stage', match_day:2, scheduled_at:'2026-06-20T18:00:00.000Z', group_name:'D' },
      { home_team:'Portugal',    away_team:'England',      home_flag:'🇵🇹', away_flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', stage:'group_stage', match_day:2, scheduled_at:'2026-06-20T21:00:00.000Z', group_name:'F' },
      { home_team:'Netherlands', away_team:'Japan',        home_flag:'🇳🇱', away_flag:'🇯🇵', stage:'group_stage', match_day:2, scheduled_at:'2026-06-21T18:00:00.000Z', group_name:'G' },
      { home_team:'Senegal',     away_team:'Australia',    home_flag:'🇸🇳', away_flag:'🇦🇺', stage:'group_stage', match_day:2, scheduled_at:'2026-06-21T21:00:00.000Z', group_name:'I' },
      { home_team:'South Korea', away_team:'Brazil',       home_flag:'🇰🇷', away_flag:'🇧🇷', stage:'group_stage', match_day:2, scheduled_at:'2026-06-22T18:00:00.000Z', group_name:'H' },
    ];
    for (const m of ms) {
      matches.insert({ id: id++, status: 'scheduled', home_score: null, away_score: null, ...m });
    }
    console.log(`✅ ${ms.length} matches seeded`);
  }
}

seed();

// Helper: get round slug for a match
export function getRoundSlug(match) {
  if (match.match_day === 1) return 'group_stage_1';
  if (match.match_day >= 2) return 'group_stage_2';
  return match.stage?.toLowerCase().replace(/\s+/g, '_') ?? 'unknown';
}

// Helper: is a match locked for predictions? (3 hours before kickoff)
// Admin bypasses this entirely
export function isMatchLocked(match) {
  const lockTime = new Date(match.scheduled_at).getTime() - (3 * 60 * 60 * 1000);
  return Date.now() >= lockTime;
}

// Helper: format user for API response
export function formatUser(u) {
  return { id: u.id, email: u.email, displayName: u.display_name, isAdmin: u.is_admin === true || u.is_admin === 1, profileImageUrl: u.profile_image ?? null };
}
