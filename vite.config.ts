import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      injectRegister: "auto",
      manifest: {
        name: "My Awesome PWA",
        short_name: "PWA Demo",
        description: "A description for my PWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/ios/192.png", // You need to generate these icons
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/ios/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      // Add workbox configuration for offline caching strategies if needed
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
