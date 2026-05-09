const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// MUI spacing unit is 8px. 2rem = 32px = 4 units. 3rem = 48px = 6 units.
// pb-12 (tailwind) = 48px = 6 units. pb-16 (tailwind) = 64px = 8 units.

content = content.replace(
  /pt: 8, pb: 12, md: \{ pt: 12, pb: 16 \}/g,
  "pt: 4, pb: 6, md: { pt: 6, pb: 8 }"
);

fs.writeFileSync(filePath, content);
console.log('MUI padding synchronized with Tailwind hero rhythm');
