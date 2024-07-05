import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  base: "/web-thuongmai/",
  build: { chunkSizeWarningLimit: 1600 },
  resolve: {
    alias: {
      "@actions": "/src/actions",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@redux": "/src/redux",
      "@routes": "/src/routes",
    },
  },
  define: { "process.env": {} },
});
