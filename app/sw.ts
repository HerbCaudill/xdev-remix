/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-await-in-loop */

import { clientsClaim } from "workbox-core"
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching"
import { NavigationRoute, registerRoute } from "workbox-routing"
import { CacheFirst } from "workbox-strategies"
import { CONTACTS } from "./data/contacts.js"

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")))

self.skipWaiting()
clientsClaim()

// cache avatars from devresults.com
// https://stackoverflow.com/questions/51984349/cache-remote-http-asset
// this will no longer be necessary once contacts are stored in documents with the rest of the local data

const cacheName = "avatar-cache"
const avatarUrls = CONTACTS.map(user => user.avatarUrl) // e.g. https://www.devresults.com/images/staff/square/herb.jpg

// when the service worker is installed, fetch each avatar and cache it
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(async cache => {
      for (const url of avatarUrls) {
        const response = await fetch(url, { mode: "no-cors" })
        await cache.put(url, response)
      }
    }),
  )
})

// use the cache-first strategy for any requests to devresults.com
// https://developer.chrome.com/docs/workbox/modules/workbox-strategies/#cache-first-cache-falling-back-to-network
registerRoute(/^https:\/\/www\.devresults\.com/, new CacheFirst({ cacheName }))
