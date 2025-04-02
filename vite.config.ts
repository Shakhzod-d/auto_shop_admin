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
    host: "0.0.0.0", // Tashqi kirishlarni qabul qilish
    strictPort: true, // Agar port band bo‘lsa, boshqa portga o‘tmaslik
    watch: {
      usePolling: true, // Docker ichida fayl o‘zgarishlarini kuzatish uchun
    },
    hmr: {
      clientPort: 443, // HTTPS orqali ishlayotgan bo‘lsa
      path: "/ws", // WebSocket’ni boshqa path’ga o‘tkazish mumkin
    },
    allowedHosts: ["admin.autoshop.uz"],
  },
});
