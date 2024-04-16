
self.addEventListener("install", (event) => {
  console.log("install app", event)
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        // Add other static assets and routes you want to cache
      ]);
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

// self.addEventListener('install', event => {
// });

self.addEventListener('activate', event => {
  console.log('Service worker activated');

  // Clear old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Filter out old caches
          // For example, you may have named caches based on versions
          // Here we assume cache names starting with "my-cache-" are old
          console.log(cacheName);
          return cacheName.startsWith('my-cache') && cacheName !== 'my-cache';
        }).map(cacheName => {
          return caches.delete(cacheName); // Delete the old cache
        })
      );
    })
  );

  // Do other activation tasks if needed
});

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// self.addEventListener('fetch', function (event) {
//   console.log('Fetch event:', event.request.url);
//   // Add fetch event listener if necessary
// });

// Custom logic to prompt for installation
self.addEventListener('activate', function (event) {
  console.log('Activation event received', event);
  event.waitUntil(
    self.registration.showNotification('Install App?', {
      actions: [{ action: 'install', title: 'نصب' }],
      body: 'آیا تمایل دارید این اپلیکیشن را نصب کنید؟',
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  if (event.action === 'install') {
    event.waitUntil(
      self.skipWaiting(), // Activate the waiting service worker
      // Add installation logic here
    );
  }
});
