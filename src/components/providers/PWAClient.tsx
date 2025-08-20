'use client';

import { useEffect } from 'react';

export default function PWAClient() {
  useEffect(() => {
    // PWA installation logic
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker for PWA functionality
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
    }
  }, []);

  return null;
}
