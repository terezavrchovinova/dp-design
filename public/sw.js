/* eslint-env serviceworker */
// Service Worker for caching Usercentrics CMP files
// Uses Cache-First strategy with long TTL to reduce network requests on repeat visits

const CACHE_NAME = 'usercentrics-cache-v1'

// Install event - prepare cache
self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      // Cache is ready
      return Promise.resolve()
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  // Take control of all clients immediately
  return self.clients.claim()
})

// Fetch event - Cache-First strategy for Usercentrics files
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Only handle Usercentrics CMP requests
  const isUsercentricsRequest =
    url.hostname === 'web.cmp.usercentrics.eu' ||
    url.hostname === 'app.usercentrics.eu' ||
    url.hostname.includes('usercentrics.eu')

  if (!isUsercentricsRequest) {
    return // Let browser handle non-Usercentrics requests
  }

  // Use Cache-First strategy: serve from cache if available, otherwise fetch and cache
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately
          return cachedResponse
        }

        // Not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200 || response.type === 'opaque') {
              // Clone response before caching
              const responseToCache = response.clone()
              // Cache the response for future requests
              cache.put(event.request, responseToCache)
            }
            return response
          })
          .catch((error) => {
            // Network error - if we have an old cached version, serve it
            if (cachedResponse) {
              return cachedResponse
            }
            // Otherwise, reject the promise (browser will handle the error)
            throw error
          })
      })
    })
  )
})
