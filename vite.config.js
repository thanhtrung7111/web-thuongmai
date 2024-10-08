import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // include: ["source-map-js", "path"],
  },
  // base: "/web-thuongmai/",
  build: { chunkSizeWarningLimit: 1600 },
  define: { "process.env": {} },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://api-dev.firstems.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
