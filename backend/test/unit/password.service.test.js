/*
 * Password Service Unit Tests
 *
 * This file contains unit tests for the Password Service module which handles:
 * - password checking
 * - OTP generation
 * - OTP Validation
 *
 * Dependencies:
 * - llm.service.js: Core user management functions
 * - bcrypt: hashing and comparing passwords securely
 * - otplib: generating and verifying time-based one-time passwords
 * - lru-cache: temporarily storing OTP validation attempts to prevent reuse or spamming
 * - errorUtil.js: Custom error handling
 */

// Import service
const passService = require("../../services/password.service");

/**
 * Checks if password can be hashed and matched back to original un-hashed password.
 */
test("Check password hash against original password.", async () => {
  var originalPassword = "PasswordTest123!";
  var hashedPassword = await passService.hashPassword(originalPassword);
  expect(await passService.checkPassword(originalPassword, hashedPassword)).toBe(true); // Hashed password should match original
  var invalidPassword = "NotTheRightPassword";
  expect(await passService.checkPassword(invalidPassword, hashedPassword)).toBe(false); // Hashed password should not match invalid password
  var hashedInvalidPassword = await passService.hashPassword(invalidPassword);
  expect(await passService.checkPassword(originalPassword, hashedInvalidPassword)).toBe(false); // Hashed invalid password should not match original password
});

/**
 * Checks if OTP can be generated and that the output is valid.
 */
test("Check OTP code generation.", async () => {
  var id = "123456789";
  var code = await passService.generateOtp(id); // Should not throw any errors
  expect(typeof code).toBe("string"); // Should be a string
  expect(code.length).toBe(6); // Should be length 6
  expect(parseInt(code)).not.toBe(NaN); // Should parse to a valid int
});

/**
 * Checks if OTP validation works correctly and correctly throws an error if not.
 */
test("Check OTP validation.", async () => {
  var id = "123456789";
  var code = await passService.generateOtp(id);
  await passService.verifyOtp(id, code); // Should not throw any errors since the code is correct
  await passService.generateOtp(id); // Regenerates code to make old one invalid
  // Had to wrap verifyOtp call in an anonymous function to get Jest to catch the custom error correctly
  expect(async () => {
    await passService.verifyOtp(id, code);
  }).toThrow(/Invalid OTP/); // Should throw error containing "Invalid OTP"
});
