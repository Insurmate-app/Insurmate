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

module.exports = {
  createUser,
  resetPassword,
  loginUser,
};
