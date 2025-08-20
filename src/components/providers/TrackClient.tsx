'use client';

import { useEffect } from 'react';

export default function TrackClient() {
  useEffect(() => {
    // Add any analytics tracking here
    // Example: Google Analytics, Mixpanel, etc.
    console.log('Tracking client initialized');
  }, []);

  return null;
}
