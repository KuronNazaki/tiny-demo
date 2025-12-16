import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    const userAgreed = window.confirm(
      "Có phiên bản mới của ứng dụng! Tải lại ngay?"
    );

    if (userAgreed) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("Ứng dụng đã sẵn sàng chạy ngoại tuyến.");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
