const userService = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.resetPassword(email, password);
    res.status(200).json("Password reset successful.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.loginUser(email, password);
    res.status(200).json("Login successful.");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
};
