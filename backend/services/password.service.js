const bcrypt = require("bcrypt");
const otplib = require("otplib");
const { LRUCache } = require("lru-cache");
const log = require("../logger");
const CustomError = require("../errorhandling/errorUtil");

const saltRounds = 10;

otplib.authenticator.options = { step: 900 };

const otpCache = new LRUCache({
  max: 300,
  maxSize: 30,
  sizeCalculation: (value, key) => value.otp.length,
  ttl: 1000 * 60 * 60,
  ttlAutopurge: true,
});

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    log.error(err.message);
    throw err;
  }
}

async function checkPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    log.error(err.message);
    throw err;
  }
}

const generateOtp = async (id) => {
  try {
    const cachedOtpData = otpCache.get(id);

    if (cachedOtpData) {
      otpCache.delete(id);
    }
    // Generate a unique secret for each OTP generation
    const dynamicSecret = otplib.authenticator.generateSecret();

    // Generate the OTP using the dynamic secret
    const otp = otplib.authenticator.generate(dynamicSecret);
    
    // Store the OTP and secret in the cache with the user's ID as the key
    otpCache.set(id, { otp, secret: dynamicSecret });
    return otp;
  } catch (err) {
    log.error(err.message);
    throw err;
  }
};

const verifyOtp = async (id, token) => {
  try {
    // Retrieve the OTP and secret from the cache
    const cachedOtpData = otpCache.get(id);

    if (!cachedOtpData) {
      log.error(`OTP not found or expired for id: ${id}`);
      throw CustomError("OTP not found or expired.", 401);
    }

    // Retrieve the OTP and secret from the cached data
    const { otp, secret } = cachedOtpData;
    log.info(
      `Cached OTP: ${otp}, Secret: ${secret}, Provided Token: ${token} for id: ${id}`
    );

    if (otp.toString().trim() !== token.toString().trim()) {
      log.error(`Provided token does not match cached OTP for id: ${id}`);
      throw CustomError("Invalid OTP", 401);
    }

    // If OTP is valid, remove it from the cache
    otpCache.delete(id);
  } catch (error) {
    log.error(`Error during OTP verification for id: ${id} - ${error.message}`);
    if (error.statusCode >= 400 && error.statusCode < 500) {
      throw error;
    } else {
      throw CustomError("Your OTP is invalid. Please try again.", 500);
    }
  }
};

module.exports = {
  hashPassword,
  checkPassword,
  generateOtp,
  verifyOtp,
};
