const User = require("../models/user.model");
const emailService = require("../services/email.service");
const modelMapper = require("lodash");

// Create User
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);

    if (user) {
      await emailService.sendEmail({
        to: user.username,
        subject: "Welcome to WeCare Insurance",
        text: `Hello ${user.companyName}, your account has been successfully created!`,
      });
    }

    const userDto = modelMapper.pick(user, [
      "_id",
      "username",
      "companyName",
      "address.addressLine1",
      "address.addressLine2",
      "address.city",
      "address.state",
      "address.zipCode",
    ]);

    return userDto;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Reset Password
const resetPassword = async (userId, newPassword) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }
    const userDto = modelMapper.pick(updatedUser, ["_id", "username"]);

    return userDto;
  } catch (error) {
    throw new Error("Error resetting password: " + error.message);
  }
};

// Login User
const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found.");
    }

    // Check if the account is locked or inactive
    if (user.failedLoginAttempts >= 5 || !user.activeAccount) {
      throw new Error(
        "Account is inactive or locked because there are more than 5 failed login attempts."
      );
    }

    if (user.password !== password) {
      user.failedLoginAttempts += 1;
      await user.save();
      throw new Error("Invalid password.");
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    await user.save();

    const userDto = modelMapper.pick(user, ["_id", "username"]);

    return userDto;
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
};
