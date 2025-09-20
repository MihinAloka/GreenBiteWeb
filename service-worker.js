const CACHE_NAME = "greenbite-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/workout.html",
  "/recipes.html",
  "/calculator.html",
  "/mindfulness.html",
  "/contact.html",
  "/Green_Bite__2_-removebg-preview.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
