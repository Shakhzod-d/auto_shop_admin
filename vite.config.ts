import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   allowedHosts: ["localhost", "admin.autoshop.uz"],
  // },
  server: {
    host: true, // Docker ichidan tashqariga chiqish uchun
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443, // Agar HTTPS bo‘lsa
      protocol: "https",
    },
  },
});
