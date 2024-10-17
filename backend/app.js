"use strict";

require("dotenv").config();
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const healthcheck = require("express-healthcheck");
const gracefulShutdown = require("express-graceful-shutdown");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();

const errorHandler = require("./middlewares/errorHandler.js");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");

const dbUrl = process.env.DATABASE_URL;
const maxPoolSize = process.env.MAX_POOL_SIZE;
const maxIdleTimeMS = process.env.MAX_Idle_Time_MS;
const connectionTimeoutMS = process.env.CONECTION_TIMEOUT_MS;

// helment
// https://blog.logrocket.com/using-helmet-node-js-secure-application/
app.use(helmet());

app.use((req, res, next) => {
  // Enable XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Define a rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Apply the rate limiter to all requests
app.use(limiter);

// Allow all origins or configure specific origins
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Health check route
app.use("/health", healthcheck());

// route
app.use("/v1/api/product", productRoute);
app.use("/v1/api/user", userRoute);

app.get("/", (req, res) => res.send("CI/CD Test [ No. 5 ]"));

// Error handling middleware should be the last middleware
app.use(errorHandler);

// Handling graceful shutdown middleware
app.use(gracefulShutdown(app));

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Event listener for server close event (to debug if the server is actually closing)
server.on("close", () => {
  console.log("Server has closed all connections.");
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
    console.log(error);
    console.log("Connection failed!");
  });

// Graceful shutdown logic
const gracefulExit = async () => {
  console.log("Graceful shutdown initiated.");

  // Stop accepting new requests
  server.close((err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1); // Exit with error if server couldn't close
    }

    console.log("HTTP server closed, now closing MongoDB connection.");

    mongoose.disconnect();
  });

  // Add a timeout to forcefully exit if shutdown takes too long
  setTimeout(() => {
    console.log("Forcing shutdown after timeout.");
    process.exit(1);
  }, 10000); // 10 seconds timeout for forced shutdown
};

// Handle SIGTERM for PM2 or Docker shutdown
process.on("SIGTERM", gracefulExit);

// Handle SIGINT for Ctrl+C shutdown (local development)
process.on("SIGINT", gracefulExit);
