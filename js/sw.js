;
// ASIGNAR UN NOMBRE Y VERSION AL CACHE

const CACHE_NAME = 'v1_cache_blog_cafe';
urlsToCache = [ 
    './',
    'https://fonts.googleapis.com/css2?family=Open+Sans&family=PT+Sans:wght@400;700&display=swap',
    'https://fonts.gstatic.com',
    './css/style.css',
    './js/script.js',
    './img/cafe.png',
    './img/cafe200.png',
    './img/cafe400.png',
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('No se pudo registrar el cache', err))
    )
})

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if (res) {
                return res;
            } 
            
            return fetch(e.request);
            
        })
    )
})