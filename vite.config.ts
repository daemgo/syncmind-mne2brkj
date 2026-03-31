import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  plugins: [
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart(),
  ],
});
