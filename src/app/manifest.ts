import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SmartSlate',
    short_name: 'SmartSlate',
    start_url: '/',
    display: 'standalone',
    background_color: '#091521',
    theme_color: '#091521',
    icons: [
      { src: '/images/courses/swirl.png', sizes: '192x192', type: 'image/png' },
      { src: '/images/courses/swirl.png', sizes: '512x512', type: 'image/png' }
    ],
  };
}
