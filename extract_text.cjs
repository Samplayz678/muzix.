const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\piu45\\Downloads\\muzix\\content_beautified.html', 'utf8');
const lines = content.split('\n');

const cleanLines = [];
let insideStyleOrScript = false;

for (let line of lines) {
  line = line.trim();
  if (!line) continue;

  if (line.startsWith('<style') || line.startsWith('<script')) {
    insideStyleOrScript = true;
    continue;
  }
  if (line.startsWith('</style>') || line.startsWith('</script>')) {
    insideStyleOrScript = false;
    continue;
  }

  if (insideStyleOrScript) continue;

  // If it's a line that doesn't start with < and doesn't contain CSS elements, it's text!
  if (!line.startsWith('<') && !line.endsWith('>') && line.length > 1) {
    if (!line.includes('{') && !line.includes('}') && !line.includes(';') && !line.includes('px') && !line.includes('rgba')) {
      cleanLines.push(line);
    }
  }
}

console.log("Found text lines count:", cleanLines.length);
cleanLines.forEach((l, idx) => {
  console.log(`${idx}: ${l}`);
});
