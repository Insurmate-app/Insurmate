const User = require("../models/user.model");
const emailService = require("../services/email.service");
const modelMapper = require("lodash");
const log = require("../logger");
const CustomError = require("../errorhandling/errorUtil");
const passwordService = require("../services/password.service");

const sendVerificationEmail = async (email, otp) => {
  await emailService.sendEmail({
    to: email,
    subject: "Activate Account",
    text: `Hi there, \nPlease use the following OTP to activate your account: ${otp}. This OTP is valid for 5 minutes.`,
  });
};

const createUser = async (userData) => {
  try {
    // Without this, the client will have capabilities to change failed login attempts and active account status
    userData.failedLoginAttempts = 0;
    userData.activeAccount = false;

    // hashes the password the user sent before the User is created
    const hashedPassword = await passwordService.hashPassword(
      userData.password
    );
    userData.password = hashedPassword;

    const user = await User.create(userData);

    //create an OTP
    const otpToken = await passwordService.generateOtp(user.email);

    if (user) {
      await sendVerificationEmail(user.email, otpToken);
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
    // Check if the error is a MongoDB duplicate key error
    if (error.code === 11000) {
      // Extract the duplicated field (e.g., email, username)
      const duplicateField = Object.keys(error.keyValue)[0];
      const errorMessage = `Duplicate field value: '${duplicateField}' already exists.`;

      // Throw a custom error with a 409 conflict status code
      throw CustomError(errorMessage, 409);
    } else {
      log.error(error.message);
      // Handle other types of errors
      throw error;
    }
  }
};

const resetPassword = async (email, newPassword) => {
  try {
    // retrieve user
    const user = await findUserByEmail(email);
    if (!user) {
      throw CustomError("User not found.", 404);
    }

    //hash the newPassword
    newPassword = await passwordService.hashPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: newPassword, activeAccount: false },
      { new: true }
    );

    if (!updatedUser) {
      throw CustomError("User not found.", 404); // Ensure proper error status for user not found
    }
    //create an OTP
    const otpToken = await passwordService.generateOtp(user.email);

    if (updatedUser) {
      await sendVerificationEmail(updatedUser.email, otpToken);
    }
  } catch (error) {
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Unable to reset password.", 500); // Convert to 500 and re-throw
    }
  }
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw CustomError("User not found.", 404);
  }
  return user;
};

/**
 * If the failed login attempt > 5, set activeAccount to false
 */
const loginUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);

    // Check if user exists
    if (!user) {
      throw CustomError("User not found.", 400);
    }

    if (!user.activeAccount) {
      throw CustomError(
        "Account is inactive, a new verification code has been sent to your email address.",
        401
      );
    }

    // Check if account is locked or inactive
    if (user.failedLoginAttempts >= 5) {
      throw CustomError(
        "Account is locked due to more than 5 failed login attempts.",
        401
      );
    }

    // Check if password is correct by comparing it to hashed password
    const match = await passwordService.checkPassword(password, user.password);
    if (!match) {
      user.failedLoginAttempts += 1;
      await user.save();

      throw CustomError("Invalid password.", 401);
    }

    // Reset failed login attempts and activate account on successful login
    user.failedLoginAttempts = 0;
    user.activeAccount = true;
    await user.save();
  } catch (error) {
    // Handle specific error codes
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Unable to login.", 500); // Convert to 500 and re-throw
    }
  }
};

const regenerateOtp = async (email) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw CustomError("User not found.", 404);
    }

    if (user.activeAccount) {
      throw CustomError("Account is already active.", 400);
    }

    await User.findByIdAndUpdate(
      user._id,
      { activeAccount: false },
      { new: true }
    );

    const otpToken = await passwordService.generateOtp(email);

    await sendVerificationEmail(user.email, otpToken);
  } catch (error) {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
    }
  }
};

const verifyUser = async (email, otpToken) => {
  try {
    const user = await findUserByEmail(email);

    // Check if user exists
    if (!user) {
      throw CustomError("User not found.", 400);
    }

    // Check if the otpToken is valid
    await passwordService.verifyOtp(email, otpToken);

    // Now that the OTP is valid, activate the user account
    user.activeAccount = true;
    user.failedLoginAttempts = 0;

    await user.save();
  } catch (error) {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      // Handle expected errors (400-series)
      throw error; // Re-throw the error to preserve the correct status code
    } else {
      // Handle 500-series or unexpected errors
      log.error(error.message);
      // You can log the full error details or take specific actions
      throw CustomError("Unable to verify.", 500); // Convert to 500 and re-throw
    }
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
  verifyUser,
  regenerateOtp,
};
