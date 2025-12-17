/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare const self: ServiceWorkerGlobalScope;

const _VERSION_TEST = "v0.0.18";

precacheAndRoute(self.__WB_MANIFEST);

clientsClaim();

self.addEventListener("statechange", (e) => {
  console.log(e.target);
});

self.addEventListener("push", (event) => {
  const data = event.data?.text();
  // const { title, ...rest } = data ?? {};

  // Display a system notification (works even when the app is closed)
  // event.waitUntil(
  //   self.registration.showNotification(title, {
  //     ...rest,
  //   })
  // );

  // Send the message data to the main React application
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(data);
    });
  });
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("SW received:", _VERSION_TEST, event.data.data);
    self.skipWaiting();
    return;
    // Send a message back to the client (optional)
    // event.source?.postMessage("SKIP_WAITING_ACK");
  }

  self.registration.showNotification("Service Worker Message", {
    body: `Received message: ${event.data}`,
  });
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      console.log("Service Worker installing...", clients);
      clients.forEach((client) => {
        console.log("Notifying client about installation...");
        client.postMessage("Confirmed?");
      });
    })
  );
  // self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim().then(() => {
      // Force the new SW to control all open pages
      self.clients.matchAll().then((clients) => {
        console.log("Service Worker activating...", clients);
        clients.forEach((client) => {
          // Now, the client is controlled by this active Service Worker
          client.postMessage("SKIP_WAITING_ACK");
        });
      });
    })
  );
});
