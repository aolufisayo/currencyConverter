

var CACHE_NAME = 'cache-v53';

var urlsToCache = [
    '/currencyConverter/',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/currencyConverter/css/materialize.min.css',
    '/currencyConverter/css/main.css',
    '/currencyConverter/js/jquery-3.2.1.min.js',
    '/currencyConverter/js/materialize.min.js',
    '/currencyConverter/js/app.js',
    '/currencyConverter/js/promise.js',
    '/currencyConverter/js/fetch.js',
    '/currencyConverter/manifest.json'
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


//delete old caches
self.addEventListener('activate', function(event){
    console.log('activating service worker')
    event.waitUntil(
        caches.keys()
        .then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if(key != CACHE_NAME){
                    console.log("removing old cache", key)
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});

//fetch from cache
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response;
            }else {
                return fetch(event.request)
                .then(function(res){
                    return caches.open(CACHE_NAME)
                    .then(function(cache){
                        cache.put(event.request.url, res.clone() );
                        return res;
                    })
                    .catch(function(err){
                         console.log(err);
                 

                    });
                })
            };
        })
 
)

});
