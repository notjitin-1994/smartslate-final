const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const map = {
  '64': '20',
  '56': '16',
  '48': '16',
  '40': '12',
  '32': '10',
  '24': '8',
  '20': '6',
  '16': '5',
  '12': '4',
  '10': '3',
};

const files = walkSync('./src');
let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace standard tailwind paddings globally
  // Only target py, pt, pb that are > 8
  const regex = /\b(py|pt|pb|my|mt|mb)-(64|56|48|40|32|24|20|16|12|10)\b/g;
  content = content.replace(regex, (match, prefix, num) => {
    return `${prefix}-${map[num]}`;
  });

  // Specifically for RevampedHero.tsx and other Hero hardcoded classes
  if (file.includes('RevampedHero.tsx')) {
    content = content.replace(
      /pt-\[calc\(var\(--header-total-height-mobile\)\+0\.5rem\)\] pb-12 md:pt-\[calc\(var\(--header-total-height-desktop\)\+3rem\)\] md:pb-16/,
      'pt-[calc(var(--header-total-height-mobile)+0rem)] pb-4 md:pt-[calc(var(--header-total-height-desktop)+1rem)] md:pb-5'
    );
  }

  if (file.includes('StandardHero.tsx')) {
    content = content.replace(
      /padding: `\$\{theme\.spacing\(18\)\} 0`, \/\/ Increased top padding for header clearance/g,
      `paddingTop: 'calc(var(--header-total-height-desktop) + 1rem)',
  paddingBottom: theme.spacing(5), // Reduced bottom padding`
    );
    content = content.replace(
      /padding: `\$\{theme\.spacing\(10\.8\)\} 0`, \/\/ Increased top padding for header clearance/g,
      `paddingTop: 'calc(var(--header-total-height-mobile) + 0.5rem)',
    paddingBottom: theme.spacing(3), // Reduced bottom padding`
    );
  }

  // Also in some files, there are Hero sections using mt or pt that should relate to header.
  // Actually, StandardHero and RevampedHero are the main ones.
  // Wait, let's also fix BeyondSolara, PolarisIntro which have pt-12 md:pt-16.
  // We already reduced them using the regex map: 12->4, 16->5. That's a 70% reduction and will be minimal.

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated padding in ${file}`);
  }
}

console.log(`Finished updating padding in ${changedFiles} files.`);
