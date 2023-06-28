import { precacheAndRoute } from 'workbox-precaching';
import { NetworkOnly } from 'workbox-strategies';
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

registerRoute(
    'http://localhost:4000/api/tasks',
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);
// eslint-disable-next-line
// self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
// // eslint-disable-next-line
// self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
// // app-shell
// // eslint-disable-next-line no-undef
// workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());