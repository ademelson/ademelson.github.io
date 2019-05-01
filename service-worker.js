const cacheName = "Homework4_Part2_v1";
const cacheAssets = ['Attoni_Demel_Homework4_Part2.html','lightblue.jpg','lightgold.jpg']; 
                /*
                     "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css",
                     "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
                     "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"
                    ];
                    */

self.addEventListener('install',(event) => {
    console.log("================ Service Worker Installation: Starting ================");

    event.waitUntil(
        caches.open('Homework4_Part2_v1')
              .then(cache => {
                  console.log("---------------- Service Worker Installation: Cahing Files -------------");
                  cache.addAll(cacheAssets);
              })
              .then(() => self.skipWaiting)
              .catch(error => {
                  console.log(`----------------- Service Worker Installing: Error Message: ${error} --------------`);
              })
    );
    console.log("================ Service Worker Installation: Completed ================");
});

self.addEventListener('activate',(event) => {
    console.log("====================== Service Worker Activation =====================");
});

/*
self.addEventListener('fetch', event => {
    console.log("Fetching Resource: ");
    event.respondWith(
       fetch(event.request)
       .catch(() => fetch(caches.match(event.reques))));
});
*/

self.addEventListener('fetch',event => {
    console.log("================ Fetching Operation: ===================");
    event.respondWith(
        caches.match(event.request)
        .then(response1 => {
            console.log(`===== Service Worker: Fetching From Cache | Resource: ${event.request.url}`);
            return response1;})
        .catch( () => {
            console.log(`===== Service Worker: Fetching From Network | Resource: ${event.request.url}`)
            return fetch(event.request);
        })
    );
});

/*
self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+ e.request.url);
        return r || fetch(e.request).then(response => {
          return caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+ e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });
  */