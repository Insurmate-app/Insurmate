const bcrypt = require("bcrypt");
const saltRounds = 10;

const otplib = require("otplib")
const secret = otplib.authenticator.generateSecret();

otplib.authenticator.options = { step: 900 };
async function hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      console.error(err);
    }
}

async function checkPassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (err) {
      console.error(err);
    }
}

async function generateOtp(){
    const otp = otplib.authenticator.generate(secret);
    return otp;
}

async function verifyOtp(token){
    const isValid = otplib.authenticator.check(token, secret);
    return isValid
}

module.exports = {
    hashPassword,
    checkPassword,
    generateOtp,
    verifyOtp
};