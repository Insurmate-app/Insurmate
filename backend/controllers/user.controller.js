const userService = require("../services/user.service");

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
    await userService.resetPassword(email, password);
    res.status(200).json("Password reset successful.");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await userService.loginUser(email, password);
    res.status(200).json("Login successful.");
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

module.exports = {
  createUser,
  resetPassword,
  loginUser,
  verifyUser,
  regenerateOtp,
};
