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
      { src: '/logo-swirl.png?v=3', sizes: '192x192', type: 'image/png' },
      { src: '/logo-swirl.png?v=3', sizes: '512x512', type: 'image/png' }
    ],
  };
}
