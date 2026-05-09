const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle' });
    
    // Inspect the logo and its parents
    const results = await page.evaluate(() => {
      const img = document.querySelector('header img[alt="Smartslate"]');
      if (!img) return "LOGO NOT FOUND";
      
      const link = img.parentElement;
      const headerContent = link.parentElement;
      const headerWrapper = headerContent.parentElement;
      
      return {
        img: {
          width: img.offsetWidth,
          height: img.offsetHeight,
          src: img.src,
          className: img.className,
          style: img.getAttribute('style'),
          computedStyle: {
            height: window.getComputedStyle(img).height,
            maxHeight: window.getComputedStyle(img).maxHeight,
            display: window.getComputedStyle(img).display
          }
        },
        link: {
          width: link.offsetWidth,
          height: link.offsetHeight,
          className: link.className,
          computedStyle: {
            height: window.getComputedStyle(link).height,
            display: window.getComputedStyle(link).display,
            alignItems: window.getComputedStyle(link).alignItems
          }
        },
        headerContent: {
          height: headerContent.offsetHeight,
          alignItems: window.getComputedStyle(headerContent).alignItems
        }
      };
    });
    
    console.log(JSON.stringify(results, null, 2));
    
  } catch(e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
