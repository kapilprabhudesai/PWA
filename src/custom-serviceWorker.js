import { precacheAndRoute } from 'workbox-precaching';
import { NetworkOnly ,CacheFirst,NetworkFirst} from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import {registerRoute} from 'workbox-routing';

// eslint-disable-next-line no-undef
// if (workbox) {
//     console.log(`Workbox is loaded 🎉`);
// } else {
//     console.log(`Workbox didn't load `);
// }
// eslint-disable-next-line no-undef, no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);
const bgSyncPlugin = new BackgroundSyncPlugin('myPendingTasks', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const newBaseUrl =  /https:\/\/audiinspectionapiv2.stageibb.com\/api\/*/,
registerRoute(
    newBaseUrl,
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);

registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new CacheFirst()
  );
  
  // Default strategy for all other requests
  registerRoute(
    new RegExp('.*'),
    new NetworkFirst()
  );
// eslint-disable-next-line
 self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
// // eslint-disable-next-line
 self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
// // app-shell
// // eslint-disable-next-line no-undef
// workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());
