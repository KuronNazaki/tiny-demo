/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare const self: ServiceWorkerGlobalScope;

const _VERSION_TEST = "v0.0.3";

precacheAndRoute(self.__WB_MANIFEST);

clientsClaim();

self.addEventListener("install", (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "CACHE_READY",
          message: "Ứng dụng đã sẵn sàng chạy ngoại tuyến! " + _VERSION_TEST,
        });
      });
    })
  );
});
