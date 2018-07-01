

var CACHE_NAME = 'cache-v53';

var urlsToCache = [
    '/',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/css/materialize.min.css',
    '/css/main.css',
    '/js/jquery-3.2.1.min.js',
    '/js/materialize.min.js',
    '/js/app.js',
    '/js/promise.js',
    '/js/fetch.js',
    '/manifest.json'
]

//setup install event
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});
