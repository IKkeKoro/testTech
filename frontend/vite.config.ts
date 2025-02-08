import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { config } from 'dotenv';
config();
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: "/",
  define: {
    'process.env': process.env
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});



