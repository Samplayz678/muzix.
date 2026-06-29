const fs = require('fs');
const filePath = 'C:\\Users\\piu45\\.gemini\\antigravity-cli\\brain\\fbdd50d7-b927-415f-9e96-fbfc48f7a776\\.system_generated\\steps\\26\\content.md';
const content = fs.readFileSync(filePath, 'utf8');
console.log("Length:", content.length);
console.log("Slice last 8000 characters:");
console.log(content.slice(-8000));
