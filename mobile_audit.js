const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 }, // iPhone 13 mini / standard mobile
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  
  try {
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Capture different sections
    await page.screenshot({ path: 'mobile-audit-full.png', fullPage: true });
    
    const sections = await page.evaluate(() => {
      const allSections = Array.from(document.querySelectorAll('section, main > div > div > div > div > div > div > div > div')); // heuristic for main blocks
      return allSections.map((s, i) => ({
        index: i,
        tagName: s.tagName,
        className: s.className,
        text: s.innerText.substring(0, 50) + '...',
        height: s.offsetHeight
      }));
    });
    
    console.log('Detected Sections:', JSON.stringify(sections, null, 2));
    
  } catch(e) {
    console.error('Error during audit:', e);
  } finally {
    await browser.close();
  }
})();
