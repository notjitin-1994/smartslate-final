const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /href=\{module\.link\}/g,
  "href={module.link || '#'}"
);

fs.writeFileSync(filePath, content);
console.log('Fixed TypeScript link error');
