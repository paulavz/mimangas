if ('function' === typeof importScripts) {
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

    // Workbox loaded
    if (workbox) {
        if (self && self.location && self.location.hostname === 'localhost') {
            console.log('Localhost detected. Running Workbox in debug mode!');
            workbox.setConfig({ debug: true });
        }

        // We have access to all the workbox modules here so 
        // we can configure our service worker how we want
        addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SKIP_WAITING') {
                // Use this, and not workbox.skipWaiting()
                skipWaiting();
            }
        });


        // Manifest injection point
        workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

        /**
         * BEYOND THIS POINT, MOST OF THIS CONFIG IS UP TO YOU...
         * YOU CAN CUSTOMIZE YOUR WORKBOX SERVICE-WORKER HOWEVER YOU WANT
        **/

        // https://github.com/GoogleChrome/workbox/issues/2095
        const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
        const navigationRoute = new workbox.routing.NavigationRoute(handler);
        workbox.routing.registerRoute(navigationRoute);

        workbox.routing.registerRoute(
            new RegExp('https://firebasestorage.googleapis.com/'),
            new workbox.strategies.StaleWhileRevalidate({
                cacheName: 'images',
                plugins: [
                    new workbox.expiration.ExpirationPlugin({
                        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                        maxEntries: 500,
                        purgeOnQuotaError: true, // safe to automatically delete if exceeding the available storage
                    }),
                ],
            }
            ),

        );
        /*
                // Cache Images
                workbox.routing.registerRoute(
                    new RegExp('regExForUrlForImagesHere'),
                    new workbox.strategies.CacheFirst({
                        cacheName: 'images'
                    })
                );
        */
        // JS, CSS caching
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            new workbox.strategies.StaleWhileRevalidate({
                cacheName: 'static-resources'
            })
        );

        // Offline Google Analytics (if you want it)
        workbox.googleAnalytics.initialize();

        // You can fit other workbox modules and configure them how you want...
    } else {
        console.error(' Workbox could not be loaded. No offline support.');
    }
}