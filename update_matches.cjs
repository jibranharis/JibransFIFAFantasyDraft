const fs = require('fs');
const content = fs.readFileSync('C:/Users/jibra/.gemini/antigravity/brain/572482ba-caf3-4ed6-839e-e1583dfbca7d/.system_generated/steps/1011/content.md', 'utf8');
const json = content.split('\n---\n\n')[1];
const matches = JSON.parse(json);

const seeds = matches.map(m => ({
  id: m.id,
  home_team: m.homeTeam ? m.homeTeam.name : null,
  away_team: m.awayTeam ? m.awayTeam.name : null,
  home_flag: m.homeTeam ? m.homeTeam.flagEmoji : null,
  away_flag: m.awayTeam ? m.awayTeam.flagEmoji : null,
  stage: m.stage,
  match_day: m.matchDay,
  scheduled_at: m.scheduledAt,
  status: m.status,
  home_score: m.homeScore,
  away_score: m.awayScore,
  group_name: m.groupId
}));

fs.writeFileSync('server/matchesData.js', 'export const matchSeeds = ' + JSON.stringify(seeds, null, 2) + ';\n');
console.log('Wrote ' + seeds.length + ' matches to matchesData.js');
