const express = require("express");
const otplib = require("otplib");
const { LRUCache } = require("lru-cache"); // Correct import for version 11

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Define the LRU cache options
const otpCache = new LRUCache({
  max: 300, // Maximum number of items in cache to avoid unbounded growth
  maxSize: 30, // Maximum total size based on OTP length (for example, 6-digit OTPs allow 5 entries)
  sizeCalculation: (value, key) => value.otp.length, // Calculate size based on the length of the OTP
  ttl: 1000 * 60 * 60, // Items expire after 1 hour (TTL in milliseconds)
  ttlAutopurge: true, // Automatically remove expired items from cache
});

// Secret to generate OTPs
const secret = otplib.authenticator.generateSecret(); // You should store this securely for the user
console.log(`Secret: ${secret}`);

// Set the OTP to expire in 5 minutes (300 seconds)
otplib.authenticator.options = { step: 300 }; // Step in seconds (300s = 5 minutes)

// Route to generate OTP
app.get("/generate-otp", (req, res) => {
  const userId = req.query.userId;

  // Generate OTP
  const otp = otplib.authenticator.generate(secret);

  // Store the OTP in the cache with userId as the key
  otpCache.set(userId, { otp, secret });

  console.log(`Generated OTP for user ${userId}: ${otp}`);
  res.json({ otp, message: "OTP generated successfully!" });
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
  const { token, userId } = req.body; // The OTP submitted by the user
  const cachedOtpData = otpCache.get(userId);

  if (!cachedOtpData) {
    return res.json({ message: "OTP not found or expired." });
  }

  const { otp, secret } = cachedOtpData;
  const isValid = otplib.authenticator.check(token, secret); // Check if OTP is valid

  if (isValid) {
    otpCache.delete(userId); // Evict OTP from cache once it is used
    return res.json({ message: "OTP is valid!" });
  } else {
    return res.json({ message: "Invalid OTP!" });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
