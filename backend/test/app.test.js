/**
 * https://salithachathuranga94.medium.com/unit-testing-with-node-js-and-jest-5dba6e6ab5e
 */

const {
  createUser,
  loginUser,
  resetPassword,
} = require("../services/user.service");
const CustomError = require("../errorhandling/errorUtil");
const emailService = require("../services/email.service");
const User = require("../models/user.model");
const { pick } = require("lodash");
const passwordService = require("../services/password.service");

jest.mock("../models/user.model", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("../services/email.service", () => ({
  sendVerificationEmail: jest.fn(),
  sendEmail: jest.fn(),
}));

/**
 * Unit tests for the `createUser` functionality.
 *
 * The test suite verifies the following:
 * 1. A user can be created successfully with hashed password, generated OTP,
 *    and a verification email is sent.
 * 2. Appropriate errors are thrown for invalid scenarios, such as duplicate email.
 */
describe("create user without mocking hashPassword and generateOtp", () => {
  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case: Successfully create a user.
   *
   * Steps:
   * - Mock the database `create` method to resolve with the new user.
   * - Mock the email service `sendEmail` method to resolve successfully.
   * - Assert the user is created with the expected data and transformations.
   */
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
      password: expect.any(String), // Ensure password is hashed
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
    emailService.sendEmail.mockResolvedValue(); // Simulate successful email sending

    // Call the `createUser` function
    const result = await createUser(userData);

    // Verify the User model's `create` method was called with the expected input
    expect(User.create).toHaveBeenCalledWith({
      ...userData,
      password: expect.any(String), // Verify the password was hashed
      failedLoginAttempts: 0,
      activeAccount: false, // Ensure the account is inactive initially
    });

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

    // Verify findOne was called
    expect(User.findOne).toHaveBeenCalledWith({ email });

    // Verify checkPassword and save were not called
    expect(passwordService.checkPassword).not.toHaveBeenCalled();
    expect(mockUser.save).not.toHaveBeenCalled();
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

    // Mock the `checkPassword` method to simulate password mismatch
    passwordService.checkPassword = jest.fn((inputPassword, storedPassword) => {
      return inputPassword === "wrongpassword123" &&
        storedPassword === "hashedpassword123"
        ? false
        : true;
    });

    // Mock other functions to verify they are NOT called
    passwordService.generateOtp = jest.fn();
    emailService.sendEmail = jest.fn();

    // Assert that the function throws a `CustomError` with the correct details
    await expect(
      loginUser(loginData.email, loginData.password)
    ).rejects.toThrow(new CustomError("Invalid password.", 401));
  });

  /**
   * Test case: Handle nonexistent user error.
   *
   * Steps:
   * - Mock the database `findOne` method to return `null` for the given email.
   * - Assert a `CustomError` is thrown with the appropriate message and status code.
   * - Verify other functions (e.g., `checkPassword`, `generateOtp`) were NOT called.
   */
  it("should throw a custom error for a nonexistent user", async () => {
    const loginData = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    // Mock the `findOne` method to return null (user not found)
    User.findOne.mockResolvedValue(null);

    // Mock other functions to verify they are NOT called
    passwordService.checkPassword = jest.fn();
    passwordService.generateOtp = jest.fn();
    emailService.sendEmail = jest.fn();

    // Assert that the function throws a `CustomError` with the correct details
    await expect(
      loginUser(loginData.email, loginData.password)
    ).rejects.toThrow(new CustomError("User not found.", 404));
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
    const hashedPassword = "hashedPassword123";
    const mockUserId = "123456";
    const mockOtp = "123456";

    // Mock user object
    const mockUser = {
      _id: mockUserId,
      email: email,
    };

    // Mock updated user
    const mockUpdatedUser = {
      ...mockUser,
      password: hashedPassword,
      activeAccount: false,
    };

    // Setup mocks
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedUser);
    passwordService.hashPassword = jest.fn().mockResolvedValue(hashedPassword);
    passwordService.generateOtp = jest.fn().mockResolvedValue(mockOtp);
    emailService.sendEmail.mockResolvedValue();

    // Execute password reset
    await resetPassword(email, newPassword);
  
    expect(passwordService.hashPassword).toHaveBeenCalledWith(newPassword);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      mockUserId,
      { password: hashedPassword, activeAccount: false },
      { new: true }
    );
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
