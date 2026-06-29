const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\piu45\\.gemini\\antigravity-cli\\brain\\fbdd50d7-b927-415f-9e96-fbfc48f7a776\\.system_generated\\steps\\26\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Strip HTML tags and clean up whitespace
let text = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
text = text.replace(/<[^>]+>/g, ' ');
text = text.replace(/\s+/g, ' ');

console.log(text.slice(0, 5000));
console.log('--- REVERSE ---');
console.log(text.slice(-5000));
