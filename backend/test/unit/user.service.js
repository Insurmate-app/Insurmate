/*
 * User Service Unit Tests
 *
 * This file contains unit tests for the User Service module which handles:
 * - User registration and account creation
 * - Authentication and login
 * - Password management
 * - User data retrieval
 *
 * Dependencies:
 * - user.service.js: Core user management functions
 * - errorUtil.js: Custom error handling
 * - email.service.js: Email notification system
 * - user.model.js: User data model
 * - password.service.js: Password encryption and validation
 */

// Import required modules
const {
  createUser,
  loginUser,
  resetPassword,
  findUserByEmail,
  findUserById,
} = require("../../services/user.service");
const CustomError = require("../../errorhandling/errorUtil");
const emailService = require("../../services/email.service");
const User = require("../../models/user.model");
const { pick } = require("lodash");
const passwordService = require("../../services/password.service");

/*
 * Mock Configurations
 * Setting up test doubles to isolate the user service from external dependencies
 */
jest.mock("../../models/user.model", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
}));

jest.mock("../../services/email.service", () => ({
  sendVerificationEmail: jest.fn(),
  sendEmail: jest.fn(),
}));

// Add password service mock
jest.mock("../../services/password.service", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashedPassword"),
  generateOtp: jest.fn().mockResolvedValue("123456"),
  checkPassword: jest.fn(),
  verifyOtp: jest.fn(),
}));

/**
 * Tests user creation functionality:
 * - Successful user creation with password hashing and OTP
 * - Handling duplicate email errors
 */
describe("create user without mocking hashPassword and generateOtp", () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user, hash password, generate OTP, and send verification email", async () => {
    // Sample user input data
    const userData = {
      email: "test@example.com",
      password: "password123",
      companyName: "Test Company",
      address: {
        addressLine1: "123 Test Street",
        addressLine2: "Suite 1",
        city: "Test City",
        state: "TS",
        zipCode: "12345",
      },
    };

    // Mocked database response for the created user
    const createdUser = {
      ...userData,
      _id: "12345",
      password: expect.any(String),
    };

    // DTO format for the user data to be returned
    const userDto = pick(userData, [
      "email",
      "companyName",
      "address.addressLine1",
      "address.addressLine2",
      "address.city",
      "address.state",
      "address.zipCode",
    ]);

    // Mock the User model and Email service behavior
    User.create.mockResolvedValue(createdUser);
    emailService.sendEmail.mockResolvedValue();

    // Call the `createUser` function
    const result = await createUser(userData);

    // Assert the function's output matches the expected DTO
    expect(result).toEqual(userDto);
  });

  /**
   * Test case: Handle duplicate email error.
   *
   * Steps:
   * - Mock the database `create` method to throw a duplicate key error.
   * - Assert a `CustomError` is thrown with the appropriate message and status code.
   */
  it("should throw a custom error for duplicate field values", async () => {
    // Input data for a duplicate user
    const userData = {
      email: "duplicate@example.com",
      password: "password123",
      companyName: "Test Company",
      address: {
        addressLine1: "123 Test Street",
        addressLine2: "Suite 1",
        city: "Test City",
        state: "TS",
        zipCode: "12345",
      },
    };

    // Simulated error response from the database for a duplicate key
    const duplicateError = {
      code: 11000,
      keyValue: { email: "duplicate@example.com" },
    };

    // Mock the User model's `create` method to reject with a duplicate error
    User.create.mockRejectedValue(duplicateError);

    // Assert that the function throws a `CustomError` with the correct details
    await expect(createUser(userData)).rejects.toThrow(
      new CustomError("Duplicate field value: 'email' already exists.", 409)
    );
  });
});

/**
 * Unit tests for the `loginUser` functionality.
 *
 * The test suite verifies the following:
 * 1. Logging in with an inactive account (failedLogin >= 5) throws a custom error.
 * 2. Logging in with an invalid password throws a custom error.
 * 3. Log in with a nonexistent user - throws a custom error.
 */
describe("Login User Functionality", () => {
  passwordService.checkPassword = jest.fn();

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case: Handle account locked due to more than 5 failed login attempts.
   *
   * Steps:
   * - Mock the User model's `findOne` method to return a user object with `failedLoginAttempts` >= 5.
   * - Ensure the user's `activeAccount` is `true` to simulate an active account that is now locked.
   * - Mock the `checkPassword` method to return `false` (password mismatch).
   * - Call the `loginUser` function with the user's email and password.
   * - Assert that a `CustomError` is thrown with the appropriate message and status code.
   * - Verify that `checkPassword` and `save` methods are NOT called, as the account is already locked.
   */
  it("should throw a custom error when account is locked due to more than 5 failed login attempts", async () => {
    // Test data
    const email = "locked@example.com";
    const password = "invalidPassword";

    const mockUser = {
      _id: "user123",
      email: email,
      password: "hashedPassword123",
      activeAccount: true,
      failedLoginAttempts: 5,
      save: jest.fn(),
    };

    // Setup mocks
    User.findOne.mockResolvedValue(mockUser);

    await expect(loginUser(email, password)).rejects.toThrow(
      new CustomError(
        "Account is locked due to more than 5 failed login attempts.",
        401
      )
    );
  });

  /**
   * Test case: Handle invalid password error.
   *
   * Steps:
   * - Mock the database `findOne` method to return a valid user object.
   * - Mock the `checkPassword` method to return `false` (password mismatch).
   * - Pass a specific invalid password and verify that the password check fails.
   * - Assert a `CustomError` is thrown with the appropriate message and status code.
   * - Verify other functions (e.g., `generateOtp`, `sendEmail`) are NOT called.
   */
  it("should throw a custom error for an invalid password", async () => {
    const loginData = {
      email: "test@email.com",
      password: "wrongpassword123",
    };

    // Mocked user object returned by `findOne`
    const mockUser = {
      email: loginData.email,
      password: "hashedpassword123",
      failedLoginAttempts: 0,
      activeAccount: true,
      save: jest.fn(),
    };

    // Mock the `findOne` method to return the mocked user
    User.findOne.mockResolvedValue(mockUser);

    // Mock other functions to verify they are NOT called
    emailService.sendEmail = jest.fn();

    // Assert that the function throws a `CustomError` with the correct details
    await expect(
      loginUser(loginData.email, loginData.password)
    ).rejects.toThrow(new CustomError("Invalid password.", 401));
  });

  it("should login successfully when the user is active", async () => {
    const email = "active_user@email.com";
    const password = "validPassword123";

    // Create mock user without save method (it will inherit from prototype)
    const mockUser = {
      email: email,
      password: "hashedPassword",
      activeAccount: true,
      failedLoginAttempts: 0,
      save: jest.fn().mockResolvedValue(undefined),
    };

    User.findOne.mockResolvedValue(mockUser);
    passwordService.checkPassword.mockResolvedValue(true);

    await loginUser(email, password);

    // Verify the expected behaviors
    expect(mockUser.failedLoginAttempts).toBe(0);
    expect(mockUser.activeAccount).toBe(true);
    expect(passwordService.checkPassword).toHaveBeenCalledWith(
      password,
      mockUser.password
    );
  });
});

describe("retrieve users functionality", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should retrieve a user by email", async () => {
    const email = "test@example.com";

    User.findOne.mockResolvedValue({
      email: email,
      companyName: "Test Company",
    });

    const result = await findUserByEmail(email);

    expect(result).toEqual({
      email: email,
      companyName: "Test Company",
    });
  });

  it("should return not found error when user does not exist", async () => {
    const email = "fake_user@test.com";

    User.findOne.mockResolvedValue(null);

    await expect(findUserByEmail(email)).rejects.toThrow(
      new CustomError("User not found.", 404)
    );

    expect(User.findOne).toHaveBeenCalledWith({ email });
  });

  it("should retrieve by user ID", async () => {
    const userId = "123456";
    const user = {
      _id: userId,
      email: "test_user@test.com",
      password: "hashedPassword",
      activeAccount: true,
      failedLoginAttempts: 0,
    };

    User.findOne.mockResolvedValue(user);

    const result = await findUserById(userId);

    expect(result).toEqual(user);
  });

  it("should return not found error when user ID does not exist", async () => {
    const userId = "fake_user_id";

    User.findOne.mockResolvedValue(null);

    await expect(findUserById(userId)).rejects.toThrow(
      new CustomError("User not found.", 404)
    );
  });
});

/**
 * Unit tests for the `resetPassword` functionality.
 *
 * The test suite verifies the following:
 * 1. Password can be reset successfully, the new password is hashed, an OTP is generated,
 *    and a verification email is sent.
 * 2. Attempting to reset the password for a nonexistent user throws a custom error.
 */
describe("Password Reset Functionality", () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case: Successfully reset password and send verification email.
   *
   * Steps:
   * - Mock the User model's `findOne` method to resolve with an existing user.
   * - Mock the User model's `findByIdAndUpdate` method to resolve with the updated user.
   * - Mock the `hashPassword` method to return a hashed password.
   * - Mock the `generateOtp` method to return a generated OTP.
   * - Mock the email service's `sendEmail` method to resolve successfully.
   * - Call the `resetPassword` function and verify all operations are performed correctly.
   */
  it("should successfully reset password and send verification email", async () => {
    // Test data
    const email = "test@example.com";
    const newPassword = "newPassword123!";
    const mockUserId = "123456";

    // Mock user object
    const mockUser = {
      _id: mockUserId,
      email: email,
    };

    // Mock updated user
    const mockUpdatedUser = {
      ...mockUser,
      password: newPassword,
      activeAccount: false,
    };

    // Setup mocks
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);
    emailService.sendEmail.mockResolvedValue();

    // Execute password reset
    const result = await resetPassword(email, newPassword);

    // assert that the function returns the expected result
    expect(result).toBe("Password reset successfully.");
  });

  /**
   * Test case: Handle password reset for a nonexistent user.
   *
   * Steps:
   * - Mock the User model's `findOne` method to resolve with `null` (user not found).
   * - Call the `resetPassword` function and expect it to throw a `CustomError`.
   * - Assert that no further operations (like hashing password or sending email) are performed.
   */
  it("should throw an error when user does not exist", async () => {
    // Test data
    const email = "nonexistent@example.com";
    const newPassword = "newPassword123!";

    // Mock findOne to return null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);

    // Execute and verify error
    await expect(resetPassword(email, newPassword)).rejects.toThrow(
      new CustomError("User not found.", 404)
    );
  });
});

// Example for testing with existing companies
User.find.mockResolvedValue([
  { companyName: "Existing Company 1" },
  { companyName: "Existing Company 2" },
]);
