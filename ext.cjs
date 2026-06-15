const code=require('fs').readFileSync('original.js','utf-8');
const authIdx = code.indexOf('Register'); 
if(authIdx > -1) console.log('AUTH PAGE:', code.substring(authIdx - 1000, authIdx + 1000));

const homeIdx = code.indexOf('Ready for the next match?');
if(homeIdx > -1) console.log('HOME PAGE:', code.substring(homeIdx - 1000, homeIdx + 1000));
