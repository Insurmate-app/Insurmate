import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  integrations: [react()],
  vite: {
    envPrefix: "VITE_",
  },
});
