/*
 * Password Service Unit Tests
 *
 * This file contains unit tests for the Password Service module which handles:
 * - password checking
 * - OTP generation
 * - OTP Validation
 */
const passService = require("../../services/password.service");

describe("Password Service", () => {
  describe("Password Hashing", () => {
    const originalPassword = "PasswordTest123!";
    let hashedPassword;

    beforeEach(async () => {
      hashedPassword = await passService.hashPassword(originalPassword);
    });

    it("should correctly verify valid password", async () => {
      const result = await passService.checkPassword(
        originalPassword,
        hashedPassword
      );
      expect(result).toBe(true);
    });

    it("should reject invalid password", async () => {
      const invalidPassword = "NotTheRightPassword";
      const result = await passService.checkPassword(
        invalidPassword,
        hashedPassword
      );
      expect(result).toBe(false);
    });
  });

  describe("OTP Operations", () => {
    const testId = "123456789";

    it("should generate valid 6-digit OTP code", async () => {
      const code = await passService.generateOtp(testId);
      expect(code).toMatch(/^\d{6}$/);
    });

    it("should validate correct OTP code", async () => {
      const code = await passService.generateOtp(testId);
      await expect(passService.verifyOtp(testId, code)).resolves.not.toThrow();
    });

    it("should reject invalid OTP code", async () => {
      const code = await passService.generateOtp(testId);
      await passService.generateOtp(testId); // Generate new code to invalidate the old one

      await expect(passService.verifyOtp(testId, code)).rejects.toThrow(
        /Invalid OTP/
      );
    });
  });
});
