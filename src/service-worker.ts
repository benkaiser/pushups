/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis

const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './',
  './index.js',
  './static/main.css'
];

// The install handler takes care of precaching the resources we always need.
sw.addEventListener('install', event => {
  event.waitUntil(
    caches.open(RUNTIME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => sw.skipWaiting())
  );
});

sw.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.url.startsWith(self.location.origin) || event.request.url.includes('bootstrap')) {
    event.respondWith(caches.match(event.request).then(cachedResponse => {
        const refetch = () => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return caches.open(RUNTIME).then(cache => {
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          })
        };
        if (cachedResponse) {
          refetch();
          return cachedResponse;
        } else {
          return refetch();
        }
      })
    );
  }
});

sw.addEventListener('push', function(e) {
  var options = {
    icon: 'https://benkaiser.github.io/pushups/static/icons/icon-512x512.png',
    body: "Let's go!"
  };
  e.waitUntil(
    sw.registration.showNotification('Pushup Time', options)
  );
});