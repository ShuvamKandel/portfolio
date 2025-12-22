import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/portfolio/",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        blog: resolve(__dirname, "blog.html"),
        projects: resolve(__dirname, "projects.html"),
      },
    },
  },
});
