require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const productRoute = require("./routes/product.route.js");
const app = express();

const dbUrl = process.env.DATABASE_URL;
const maxPoolSize = process.env.MAX_POOL_SIZE;
const maxIdleTimeMS = process.env.MAX_Idle_Time_MS;
const connectionTimeoutMS = process.env.CONECTION_TIMEOUT_MS;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/v1/api/product", productRoute);

app.get("/", (req, res) => res.send("App is working!!!!"));

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
