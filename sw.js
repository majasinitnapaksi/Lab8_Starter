// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './assets/scripts/main.js',
  './assets/styles/main.css',

  'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Install service worker
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Fetch handler
self.addEventListener('fetch', function (event) {
  // B7
  event.respondWith(
    caches.open(CACHE_NAME).then(async function (cache) {
      // B8
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        return cachedResponse;
      }

      const networkResponse = await fetch(event.request);

      cache.put(event.request, networkResponse.clone());

      return networkResponse;
    })
  );
});