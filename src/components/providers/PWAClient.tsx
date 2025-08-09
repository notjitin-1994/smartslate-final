'use client';

import { useEffect } from 'react';

export default function PWAClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('serviceWorker' in navigator) {
      (async () => {
        try {
          await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('SW registration failed', err);
        }
      })();
    }
  }, []);

  return null;
}


