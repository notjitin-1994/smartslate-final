const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Evaluate in browser context to get widths reliably
    const dimensions = await page.evaluate(() => {
      const heroSection = document.querySelector('section:nth-of-type(1)');
      const heroContainer = Array.from(heroSection.querySelectorAll('div')).find(el => 
        el.className.includes('max-w-[1200px]') || el.className.includes('max-w-7xl')
      );
      
      const polarisSection = document.querySelector('section:nth-of-type(2)');
      const polarisContainer = Array.from(polarisSection.querySelectorAll('div')).find(el => 
        el.className.includes('max-w-[1200px]') || el.className.includes('max-w-7xl')
      );
      
      return {
        heroSection: heroSection ? { width: heroSection.offsetWidth, className: heroSection.className, paddingLeft: window.getComputedStyle(heroSection).paddingLeft } : null,
        heroContainer: heroContainer ? { width: heroContainer.offsetWidth, className: heroContainer.className, paddingLeft: window.getComputedStyle(heroContainer).paddingLeft } : null,
        polarisSection: polarisSection ? { width: polarisSection.offsetWidth, className: polarisSection.className, paddingLeft: window.getComputedStyle(polarisSection).paddingLeft } : null,
        polarisContainer: polarisContainer ? { width: polarisContainer.offsetWidth, className: polarisContainer.className, paddingLeft: window.getComputedStyle(polarisContainer).paddingLeft } : null,
      };
    });
    
    console.log(JSON.stringify(dimensions, null, 2));
    
  } catch(e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
