import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Smartslate',
    short_name: 'Smartslate',
    id: '/',
    scope: '/',
    start_url: '/',
    display: 'standalone',
    display_override: ['standalone', 'window-controls-overlay'],
    background_color: '#091521',
    theme_color: '#091521',
    icons: [
      { src: '/images/courses/swirl.png?v=desktop1', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/images/courses/swirl.png?v=desktop1', sizes: '256x256', type: 'image/png', purpose: 'any' },
      { src: '/images/courses/swirl.png?v=desktop1', sizes: '384x384', type: 'image/png', purpose: 'any' },
      { src: '/images/courses/swirl.png?v=desktop1', sizes: '512x512', type: 'image/png', purpose: 'any' }
    ],
    categories: ['education', 'productivity'],
  };
}
