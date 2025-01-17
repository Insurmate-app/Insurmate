const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_MAX_AGE = process.env.JWT_MAX_AGE;
const passport = require("passport");
require("../security/passport"); // Import Passport JWT configuration

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.resetPassword(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userService.loginUser(email, password);

    // Generate JWT token
    const token = jwt.sign({ id: email }, JWT_SECRET, {
      expiresIn: JWT_MAX_AGE, // one hour
    });

    // Set the token as a cookie (HttpOnly for security)
    res.cookie("token", token, {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client-side
      secure: true,
      sameSite: "Strict",
      maxAge: JWT_MAX_AGE, // one hour
    });

    res.status(200).json({ token: token });
  } catch (error) {
    // Pass the error to the global error handler using next()
    //res.status(500).json({ message: error.message });
    next(error); // Pass the error to the error-handling middleware
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, otpToken } = req.body;
    await userService.verifyUser(email, otpToken);
    res.status(200).json("Verification Successful.");
  } catch (error) {
    next(error);
  }
};

const regenerateOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    await userService.regenerateOtp(email);
    res.status(200).json("OTP regenerated successfully.");
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies.token);
    // Clear the cookie by setting the token cookie's maxAge to
    res.clearCookie("token", passport.authenticate("jwt", { session: false }), {
      httpOnly: true, // Ensure cookie is only accessible by the server
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
    });
    // Send a response indicating the user has been logged out
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
  verifyUser,
  regenerateOtp,
  logoutUser,
};
