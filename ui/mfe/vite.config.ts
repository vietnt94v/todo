import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    federation({
      name: "mfe-shell",
      remotes: {
        ums: "http://localhost:5174/assets/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.2.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.2.0",
        },
        "react-router-dom": {
          singleton: true,
        },
      },
    }),
  ],
  server: {
    port: 5173,
    cors: true,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
