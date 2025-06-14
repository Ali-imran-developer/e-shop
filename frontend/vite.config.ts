import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
      "@layouts": path.resolve(__dirname, "./src/components/layout"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@controllers": path.resolve(__dirname, "./src/controllers"),
    },
  },
});
