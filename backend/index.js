require("dotenv").config();
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const errorHandler = require("./routes/errorHandler");
const cors = require("cors");
const app = express();

const dbUrl = process.env.DATABASE_URL;
const maxPoolSize = process.env.MAX_POOL_SIZE;
const maxIdleTimeMS = process.env.MAX_Idle_Time_MS;
const connectionTimeoutMS = process.env.CONECTION_TIMEOUT_MS;

// helment
// https://blog.logrocket.com/using-helmet-node-js-secure-application/
app.use(helmet());

app.use((req, res, next) => {
  // Enable XSS protection: 1; mode=block
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Allow all origins or configure specific origins
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/v1/api/product", productRoute);
app.use("/v1/api/user", userRoute);

app.get("/", (req, res) => res.send("CI/CD Test (2)"));

// Error handling middleware should be the last middleware
app.use(errorHandler);

mongoose
  .connect(dbUrl, {
    maxPoolSize: maxPoolSize,
    maxIdleTimeMS: maxIdleTimeMS,
    connectTimeoutMS: connectionTimeoutMS,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed!");
  });
