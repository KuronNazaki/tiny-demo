import path from "path";
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
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      manifest: {
        name: "The Particles",
        short_name: "Particles",
        description: "The Particles Application",
        display: "standalone",
        background_color: "#0a0e12",
        theme_color: "#0a0e12",
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
  resolve: {
    alias: {
      "@pars": path.resolve(__dirname, "./src"),
    }
  }
});
