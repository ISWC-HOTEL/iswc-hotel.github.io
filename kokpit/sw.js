/* ═══════════════════════════════════════════════════════════════
   SERVICE WORKER — pozwala aplikacji działać bez internetu.
   Zasięg ograniczony do katalogu /kokpit/, więc nie dotyka
   informatora hotelowego na tym samym serwerze.

   PO KAŻDEJ ZMIANIE index.html PODNIEŚ NUMER PONIŻEJ,
   inaczej telefony będą trzymać starą wersję z pamięci.
   ═══════════════════════════════════════════════════════════════ */
const WERSJA = 'kokpit-v1';

const PLIKI = [
  './',
  './index.html',
  './manifest.webmanifest',
  './ikona-192.png',
  './ikona-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(WERSJA)
      .then(c => c.addAll(PLIKI))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(klucze => Promise.all(
        klucze.filter(k => k !== WERSJA).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Najpierw sieć (żeby poprawki dochodziły od razu), a gdy jej brak —
   wersja z pamięci. Dzięki temu aplikacja otwiera się w windzie i w piwnicy. */
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  if(new URL(e.request.url).origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(odp => {
        const kopia = odp.clone();
        caches.open(WERSJA).then(c => c.put(e.request, kopia)).catch(() => {});
        return odp;
      })
      .catch(() => caches.match(e.request).then(t => t || caches.match('./index.html')))
  );
});
