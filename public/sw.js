// Minimal service worker for installability and basic offline shell
const CACHE_NAME = 'smartslate-cache-v2';
const APP_SHELL = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : undefined)))).then(
      () => self.clients.claim()
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  try {
    const url = new URL(request.url);
    // Never cache OAuth redirects or the auth callback; always hit network
    const hasOAuthParams = url.searchParams.has('code') || url.searchParams.has('error') || url.searchParams.has('error_description');
    if (hasOAuthParams || url.pathname === '/auth/callback') {
      event.respondWith(fetch(request).catch(() => caches.match('/')));
      return;
    }
  } catch {}

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match('/'));
    })
  );
});


