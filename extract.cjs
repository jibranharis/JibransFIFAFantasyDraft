const fs = require('fs');
const code = fs.readFileSync('original.js', 'utf-8');

// Find the text for leaderboard or matches to see what components they belong to
const matchesIdx = code.indexOf('All 103 World Cup matches by round.');
if (matchesIdx > -1) {
    console.log('--- MATCHES PAGE SURROUNDING JS ---');
    console.log(code.substring(matchesIdx - 500, matchesIdx + 2000));
}

const predictionsIdx = code.indexOf('Group Stage splits into two deadlines.');
if (predictionsIdx > -1) {
    console.log('--- PREDICTIONS PAGE SURROUNDING JS ---');
    console.log(code.substring(predictionsIdx - 500, predictionsIdx + 2000));
}

const leaderboardIdx = code.indexOf('How do you stack up against the rest?');
if (leaderboardIdx > -1) {
    console.log('--- LEADERBOARD PAGE SURROUNDING JS ---');
    console.log(code.substring(leaderboardIdx - 500, leaderboardIdx + 2000));
}
