const User = require("../models/user.model");
const emailService = require("../services/email.service");
const modelMapper = require("lodash");

/**
 * 2024-09-29
 * @//toDo:
 * Create another method to activate account
 * Make activtedAccount to true after OTP verification
 */

/**
 * 2024-09-29
 * @//toDo:
 * Hash and salt the password
 * We need to send OTP to user
 */
const createUser = async (userData) => {
  try {
    // Without this, the client will have capabilities to change failed login attempts and active account status
    userData.failedLoginAttempts = 0;
    userData.activeAccount = false;

    const user = await User.create(userData);

    if (user) {
      await emailService.sendEmail({
        to: user.email,
        subject: "Welcome to We Care Insurance",
        text: `Hello ${user.companyName}, your account has been successfully created!`,
      });
    }

    const userDto = modelMapper.pick(user, [
      "email",
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

/**
 * 2024-09-29
 * @//toDo:
 * Hash and salt the password
 * We need to send OTP to user to confirm password reset
 */
const resetPassword = async (email, newPassword) => {
  try {
    // retrieve user
    const user = await findUserByEmail(email);

    // we dont allow to reset password if account is not active
    if (!user.activeAccount) {
      throw new Error("Account is not active.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: newPassword, activeAccount: false },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }
  } catch (error) {
    throw new Error("Error resetting password: " + error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    throw new Error("Error finding user: " + error.message);
  }
};

/**
 * If the failed login attempt > 5, set activeAccount to false
 */
const loginUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);

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
      throw new Error("Invalid username or password.");
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    user.activeAccount = true;
    await user.save();
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
};
