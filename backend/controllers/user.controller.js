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
    const { userId, newPassword } = req.body;
    const user = await userService.resetPassword(userId, newPassword);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
};
