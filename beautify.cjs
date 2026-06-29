const fs = require('fs');

const filePath = 'C:\\Users\\piu45\\.gemini\\antigravity-cli\\brain\\fbdd50d7-b927-415f-9e96-fbfc48f7a776\\.system_generated\\steps\\26\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// A very basic HTML beautifier/formatter to split tags onto newlines
// so we don't have massive single lines.
let formatted = content
  .replace(/>/g, '>\n')
  .replace(/</g, '\n<')
  .replace(/\n\s*\n/g, '\n');

fs.writeFileSync('C:\\Users\\piu45\\Downloads\\muzix\\content_beautified.html', formatted);
console.log("Written content_beautified.html. Length:", formatted.length);
