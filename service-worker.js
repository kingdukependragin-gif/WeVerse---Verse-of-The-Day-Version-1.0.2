const CACHE_NAME = "weverse-cache-v1";
const urlsToCache = [
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/index.html",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/about.html",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/faq.html",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/jesus-paid-it-all-piano-improvisation-314836.mp3",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/manifest.json",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/icon-192.png",
  "/WeVerse---Verse-of-The-Day-Version-1.0.2/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
