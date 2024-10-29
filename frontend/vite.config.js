import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import express from "express";

// Custom plugin for security headers
function securityHeadersPlugin() {
  return {
    name: "security-headers",
    configureServer(server) {
      server.middlewares.use(addSecurityHeaders);
      // Express middleware
      server.middlewares.use("/api", express.json(), (req, res, next) => {
        // Define Express routes here
        if (req.path === "/api/hello") {
          res.json({ message: "Hello from Express!" });
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(addSecurityHeaders);
    },
  };
}

// Function to add security headers
function addSecurityHeaders(req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Origin-Agent-Cluster", "?1");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("X-Download-Options", "noopen");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
}

export default defineConfig({
  plugins: [react(), securityHeadersPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    port: 3000,
    proxy: {
      // You can set up a proxy if you want the Vite frontend to access Express in another location
      "/api": "http://localhost:3000",
    },
  },
  preview: {
    port: 4000,
  },
});
