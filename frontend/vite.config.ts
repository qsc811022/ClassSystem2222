import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),   // ✅ 路徑別名
    },
  },
  server: {
    host: true,  // 顯示本機 IP
    port: 5173
  },
});
