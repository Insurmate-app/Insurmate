const express = require("express");
const otplib = require("otplib");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Secret to generate OTPs
const secret = otplib.authenticator.generateSecret(); // You should store this securely for the user

// Set the OTP to expire in 5 minutes (300 seconds)
otplib.authenticator.options = { step: 300 }; // Step in seconds (300s = 5 minutes)

// Route to generate OTP
app.get("/generate-otp", (req, res) => {
  const otp = otplib.authenticator.generate(secret); // Generate OTP
  console.log(`Generated OTP: ${otp}`);
  res.json({ otp, message: "OTP generated successfully!" });
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
  const { token } = req.body; // The OTP submitted by the user

  const isValid = otplib.authenticator.check(token, secret); // Check if OTP is valid
  if (isValid) {
    res.json({ message: "OTP is valid!" });
  } else {
    res.json({ message: "Invalid OTP!" });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
