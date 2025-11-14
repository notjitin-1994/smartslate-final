'use client';

import { useEffect } from 'react';

export default function PWAClient() {
  useEffect(() => {
    // PWA installation logic - currently disabled
    // Uncomment when you have a service worker file at /public/sw.js

    // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js').catch((error) => {
    //     console.log('ServiceWorker registration failed:', error);
    //   });
    // }

    // If a service worker was previously registered, unregister it
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  }, []);

  return null;
}
