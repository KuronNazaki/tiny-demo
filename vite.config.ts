import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      injectRegister: "auto",
      manifest: {
        name: "The Tiny Demo",
        short_name: "Tiny Demo",
        description: "A tiny demo for PWA",
        display: "standalone",
        icons: [
          {
            src: "/images/icon.png", // You need to generate these icons
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      // Add workbox configuration for offline caching strategies if needed
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["**/*"],
    }),
  ],
});
