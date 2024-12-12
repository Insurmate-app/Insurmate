"use strict";

require("dotenv").config();
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const healthcheck = require("express-healthcheck");
const gracefulShutdown = require("express-graceful-shutdown");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();
const server = http.createServer(app);

const { initializeWebSocket } = require("./websocket");
const errorHandler = require("./middlewares/errorHandler.js");
const userRoute = require("./routes/user.route.js");
const assetRoute = require("./routes/asset.route.js");

// Initialize WebSocket server
initializeWebSocket(server);

const dbUrl = process.env.DATABASE_URL;
const maxPoolSize = process.env.MAX_POOL_SIZE;
const maxIdleTimeMS = process.env.MAX_Idle_Time_MS;
const connectionTimeoutMS = process.env.CONECTION_TIMEOUT_MS;

// Helmet for security
app.use(helmet());

// Enable XSS protection
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// List of allowed origins
// const allowedOrigins = [
//   process.env.FRONTEND_URL, // Frontend URL from environment variables
//   "http://localhost:3000", // Additional allowed origin
// ];

// // CORS options
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies and authentication headers
// };

// // Use CORS middleware
// app.use(cors(corsOptions));

// Passport and cookies
app.use(passport.initialize());
app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Health check route
app.use("/health", healthcheck());

// Routes
app.use("/v1/api/user", userRoute);
app.use("/v1/api/asset", assetRoute);

app.get("/", (req, res) => res.send("App is working (1)!"));

// Error handler middleware
app.use(errorHandler);

// Graceful shutdown middleware
app.use(gracefulShutdown(app));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(dbUrl, {
    maxPoolSize: maxPoolSize,
    maxIdleTimeMS: maxIdleTimeMS,
    connectTimeoutMS: connectionTimeoutMS,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

// Graceful shutdown logic
const gracefulExit = async () => {
  console.log("Graceful shutdown initiated");

  // Stop accepting new requests
  server.close((err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1);
    }

    console.log("HTTP server closed, closing MongoDB connection");

    mongoose.disconnect();
  });

  setTimeout(() => {
    console.log("Forced shutdown after timeout");
    process.exit(1);
  }, 10000); // 10 seconds timeout
};

process.on("SIGTERM", gracefulExit);
process.on("SIGINT", gracefulExit);
