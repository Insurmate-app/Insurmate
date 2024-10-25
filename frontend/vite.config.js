import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       name: "configure-response-headers",
//       configureServer: (server) => {
//         server.middlewares.use((_req, res, next) => {
//           res.setHeader("Content-Security-Policy", "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests");
//           res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//           res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
//           res.setHeader("Origin-Agent-Cluster", "?1");
//           res.setHeader("Referrer-Policy", "no-referrer");
//           res.setHeader("Strict-Transport-Security", "max-age=31536000;", "includeSubDomains");
//           res.setHeader("X-Content-Type-Options", "nosniff");
//           res.setHeader("X-DNS-Prefetch-Control", "off");
//           res.setHeader("X-Download-Options", "noopen");
//           res.setHeader("X-Frame-Options", "SAMEORIGIN");
//           res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
//           res.setHeader("X-XSS-Protection", "1;", "mode=block");
//           res.setHeader("Access-Control-Allow-Origin", "*");
//           next();
//         });
//       },
//     },
//   ],
// });
