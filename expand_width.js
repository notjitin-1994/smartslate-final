const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Use a more specific replacement to avoid unintended changes
content = content.replace(
  /maxWidth: '800px',\s+textAlign: 'left'\s+\}\}\s+>\s+Traditional requirements gathering/,
  "width: '100%',\n                    textAlign: 'left'\n                  }}\n                >\n                  Traditional requirements gathering"
);

fs.writeFileSync(filePath, content);
console.log('Successfully updated page.tsx width');
