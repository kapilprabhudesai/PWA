import { precacheAndRoute } from 'workbox-precaching';
// eslint-disable-next-line no-undef
// if (workbox) {
//     console.log(`Workbox is loaded 🎉`);
// } else {
//     console.log(`Workbox didn't load `);
// }
// eslint-disable-next-line no-undef, no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);
// eslint-disable-next-line
// self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
// // eslint-disable-next-line
// self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
// // app-shell
// // eslint-disable-next-line no-undef
// workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());