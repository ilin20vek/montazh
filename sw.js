// Страница открывается из памяти телефона, даже если github.io тормозит; свежая версия подтягивается при связи.
const KESH = 'montazh-v1';
const FAILY = ['./', './index.html', './manifest.json', './ikonka-192.png', './ikonka-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(KESH).then(c => c.addAll(FAILY))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;  // Яндекс и загрузка - мимо
  e.respondWith((async () => {
    const c = await caches.open(KESH);
    const est = await c.match(e.request, {ignoreSearch: true});
    const svezh = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; });
    if (est) { e.waitUntil(svezh.catch(() => {})); return est; }
    return svezh;
  })());
});
