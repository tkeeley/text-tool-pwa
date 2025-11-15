const CACHE_NAME = "fb-text-styler-v2"; // bump version to bust old cache
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./includes/main.js",
  "./includes/transforms.js",
  "./includes/jquery-3.1.1.slim.min.js",
  "./includes/clipboard.min.js",
  "./icons/fb-styler-192.png",
  "./icons/fb-styler-512.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE).catch(function() {});
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
