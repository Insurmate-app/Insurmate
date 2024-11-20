import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import dotenv from "dotenv";

// Explicitly load environment variables
dotenv.config();

export default defineConfig({
  integrations: [react()],
  vite: {
    envPrefix: "VITE_", // Ensure variables prefixed with VITE_ are exposed
  },
});
