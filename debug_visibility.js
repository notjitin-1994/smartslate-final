const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });
    
    // Take a screenshot to see what's happening
    await page.screenshot({ path: 'debug-invisible.png', fullPage: true });
    
    // Inspect main elements
    const elements = await page.evaluate(() => {
      const main = document.querySelector('main');
      const sections = Array.from(document.querySelectorAll('section'));
      const video = document.querySelector('video');
      
      return {
        main: main ? {
          height: main.offsetHeight,
          className: main.className,
          style: window.getComputedStyle(main).cssText
        } : 'NOT FOUND',
        sections: sections.map(s => ({
          tagName: s.tagName,
          className: s.className,
          height: s.offsetHeight,
          opacity: window.getComputedStyle(s).opacity,
          zIndex: window.getComputedStyle(s).zIndex,
          position: window.getComputedStyle(s).position
        })),
        video: video ? {
          className: video.className,
          zIndex: window.getComputedStyle(video).zIndex,
          position: window.getComputedStyle(video).position,
          height: video.offsetHeight
        } : 'NOT FOUND'
      };
    });
    
    console.log(JSON.stringify(elements, null, 2));
    
  } catch(e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
