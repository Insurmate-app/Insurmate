/**
 * 2024-12-01
 * Refer to how to write unit tests: https://salithachathuranga94.medium.com/unit-testing-with-node-js-and-jest-5dba6e6ab5e
 *
 * @TODO
 * 1. Sign up a user without mocking `hashPassword` and `generateOtp`.
 * 2. Sign up a user with a duplicate email - throws a custom error.
 * 3. Log in with an inactive account (failedLogin > 5) - throws a custom error.
 * 4. Log in with an invalid password - throws a custom error.
 * 5. Log in with a nonexistent user - throws a custom error.
 * 6. Reset password successfully.
 * 7. Reset password for a nonexistent user - throws a custom error.
 */

/**
 * Unit tests for the `createUser` functionality.
 *
 * The test suite verifies the following:
 * 1. A user can be created successfully with hashed password, generated OTP,
 *    and a verification email is sent.
 * 2. Appropriate errors are thrown for invalid scenarios, such as duplicate email.
 */

const { createUser } = require("../services/user.service");
const CustomError = require("../errorhandling/errorUtil");
const emailService = require("../services/email.service");
const User = require("../models/user.model");
const { pick } = require("lodash");

// Mock the User model and Email service
jest.mock("../models/user.model", () => ({
  create: jest.fn(), // Mock the `create` method of the User model
}));

jest.mock("../services/email.service", () => ({
  sendVerificationEmail: jest.fn(), // Mock the `sendVerificationEmail` method
  sendEmail: jest.fn(), // Mock the `sendEmail` method
}));

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

    // Verify the User model's `create` method was called with the expected input
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining(userData));
  });
});
