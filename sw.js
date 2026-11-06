// Wave Sign service worker: network-first with offline fallback.
// Online you always get the latest files (no version bumping needed after
// edits); offline, the last-seen copy is served from the cache.
const CACHE = 'wave-sign';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const host = new URL(req.url).hostname;
  const fonts = host === 'fonts.googleapis.com' || host === 'fonts.gstatic.com';
  if (req.method !== 'GET' || (new URL(req.url).origin !== location.origin && !fonts)) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match('./')))
  );
});
