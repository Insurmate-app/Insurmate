const User = require("../models/user.model");
const emailService = require("../services/email.service");
const modelMapper = require("lodash");
const log = require("../logger");
const CustomError = require("../errorhandling/errorUtil");
const passwordService = require("../services/password.service");
const nameMatcherService = require("../services/name-matcher.service");
const { cache } = require("../util/cache");

const sendVerificationEmail = async (email, otp) => {
  await emailService.sendEmail({
    to: email,
    subject: "Activate Account",
    text: `Hi there, \nPlease use the following OTP to activate your account: ${otp}. This OTP is valid for 5 minutes.`,
  });
};

const createUser = async (userData) => {
  try {
    userData.failedLoginAttempts = 0;
    userData.activeAccount = false;
    userData.role = "user";

    // In createUser function
    const existingUsers = await User.find(
      { companyName: { $ne: userData.companyName } },
      "companyName"
    ); // get all company names except the current one

    const uniqueCompanyNames = [
      ...new Set(existingUsers.map((user) => user.companyName.toUpperCase())),
    ];

    const eneteredCompanyName = userData.companyName.toUpperCase();

    const similarCompanyName = await nameMatcherService.checkSimilarCompanyName(
      uniqueCompanyNames,
      eneteredCompanyName
    );

    userData.companyName = similarCompanyName;

    const hashedPassword = await passwordService.hashPassword(
      userData.password
    );
    userData.password = hashedPassword;

    const user = await User.create(userData);

    const otpToken = await passwordService.generateOtp(user.email);

    if (user) {
      await sendVerificationEmail(user.email, otpToken);
    }

    const userDto = modelMapper.pick(user, [
      "email",
      "companyName",
      "firstName",
      "lastName",
      "address.addressLine1",
      "address.addressLine2",
      "address.city",
      "address.state",
      "address.zipCode",
    ]);

    // Invalidate cache for the new user's email
    cache.delete(`user_${userDto.email}`);

    return userDto;
  } catch (error) {
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

    newPassword = await passwordService.hashPassword(newPassword);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: newPassword, activeAccount: false },
      { new: true }
    );

    if (!updatedUser) {
      throw CustomError("User not found.", 404);
    }

    const otpToken = await passwordService.generateOtp(user.email);

    if (updatedUser) {
      await sendVerificationEmail(updatedUser.email, otpToken);
    }

    cache.delete(`user_${updatedUser.email}`); // Use updatedUser.email instead of email
    cache.delete(updatedUser._id.toString()); // Convert ObjectId to string

    return "Password reset successfully.";
  } catch (error) {
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Unable to reset password.", 500);
    }
  }
};

const findUserById = async (id) => {
  // Check cache first
  const cachedUser = cache.get(id);
  if (cachedUser) {
    return cachedUser;
  }
  const user = await User.findOne({ id });
  if (!user) {
    throw CustomError("User not found.", 404);
  }
  // Store in cache
  cache.set(id, user);
  return user;
};

const findUserByEmail = async (email) => {
  const cachedUser = cache.get(`user_${email}`);
  if (cachedUser) {
    return cachedUser;
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw CustomError("User not found.", 404);
  }
  // Store in cache
  cache.set(`user_${email}`, user);
  return user;
};

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
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Unable to login.", 500);
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
      throw error;
    } else {
      log.error(error.message);
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
      throw error;
    } else {
      log.error(error.message);
      throw CustomError("Unable to verify.", 500);
    }
  }
};

module.exports = {
  findUserByEmail,
  createUser,
  resetPassword,
  loginUser,
  verifyUser,
  regenerateOtp,
  findUserById,
};
