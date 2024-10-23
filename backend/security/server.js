const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userService = require("../services/user.service");
require("./passport"); // Import Passport JWT configuration

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize passport middleware
app.use(passport.initialize());

app.use(cookieParser());

// MongoDB connection (Replace with your MongoDB URI)
mongoose.connect("mongodb://mongo:mongo@localhost:27017/dev?authSource=admin");

// Login route without passport (generating JWT token)
app.post("/login", async (req, res) => {
  try {
    // Check if the user exists
    const { email, password } = req.body;
    await userService.loginUser(email, password);

    // Generate JWT token
    const token = jwt.sign({ id: email }, JWT_SECRET, {
      expiresIn: "15m", // 15 minutes
    });

    // Set the token as a cookie (HttpOnly for security)
    res.cookie("token", token, {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client-side
      secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
      maxAge: 3600000, // 1 hour in milliseconds
    });

    //res.json({ token });
    res.status(200).json("Login successful.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout route to clear the JWT cookie
app.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Clear the cookie by setting the token cookie's maxAge to 0
    res.clearCookie("token", {
      httpOnly: true, // Ensure cookie is only accessible by the server
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
    });

    // Send a response indicating the user has been logged out
    res.status(200).json({ message: "Logged out successfully." });
  }
);

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }), // This uses Passport's JWT strategy
  (req, res) => {
    res.json({
      message: `Hello ${req.user.email}, you have access to this route!`,
    });
  }
);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
