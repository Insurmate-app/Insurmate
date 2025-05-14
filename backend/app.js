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

const errorHandler = require("./middlewares/errorHandler.js");
const userRoute = require("./routes/user.route.js");
const assetRoute = require("./routes/asset.route.js");
const fileRoute = require("./routes/file.route.js");

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
if (process.env.NODE_ENV === "prod") {
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,
    message: "Too many requests from this IP, please try again later",
  });
  app.use(limiter);
}

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
app.use("/v1/api/file", fileRoute);

app.get("/", (req, res) => res.send("active"));

// Error handler middleware
app.use(errorHandler);

// Graceful shutdown middleware
app.use(gracefulShutdown(app));

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add unhandled rejection handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Don't exit the process here, just log it
});

// Add uncaught exception handler
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Gracefully shutdown on uncaught exceptions
  gracefulExit();
});

// Improve MongoDB connection options
mongoose
  .connect(dbUrl, {
    maxPoolSize: maxPoolSize,
    maxIdleTimeMS: maxIdleTimeMS,
    connectTimeoutMS: connectionTimeoutMS,
    serverSelectionTimeoutMS: 5000, // Add timeout for server selection
    socketTimeoutMS: 45000, // Add socket timeout
    family: 4, // Use IPv4, skip trying IPv6
    retryWrites: true,
    retryReads: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    // Don't exit process here, let the app continue trying to connect
  });

// Improve graceful shutdown logic
const gracefulExit = async () => {
  console.log("Graceful shutdown initiated");

  let exitCode = 0;

  try {
    // Close server first
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error("Error closing server:", err);
          exitCode = 1;
          reject(err);
        }
        resolve();
      });
    });

    console.log("HTTP server closed, closing MongoDB connection");

    // Close MongoDB connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error during shutdown:", error);
    exitCode = 1;
  } finally {
    // Set a shorter timeout
    setTimeout(() => {
      console.log("Forced shutdown after timeout");
      process.exit(exitCode);
    }, 5000); // 5 seconds timeout
  }
};

process.on("SIGTERM", gracefulExit);
process.on("SIGINT", gracefulExit);
