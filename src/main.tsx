import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";
// import PullToRefresh from "pulltorefreshjs";

// Check if the app is in standalone mode on iOS
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isInWebAppiOS = (window.navigator as unknown as any).standalone === true;

// if (isInWebAppiOS) {
//   PullToRefresh.init({
//     mainElement: "body", // Or the specific scrollable element
//     onRefresh() {
//       // The action to perform when refreshed (e.g., reload page, fetch new data)
//       window.location.reload();
//     },
//   });
// }

// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alert("App ready to work offline!");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
