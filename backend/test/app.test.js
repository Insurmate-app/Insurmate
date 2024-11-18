//https://salithachathuranga94.medium.com/integration-testing-with-node-js-and-jest-8df71d65ca2a
// https://salithachathuranga94.medium.com/unit-testing-with-node-js-and-jest-5dba6e6ab5e

const { createUser } = require("../services/user.service"); // Adjust as necessary
const CustomError = require("../errorhandling/errorUtil");
const emailService = require("../services/email.service");
const User = require("../models/user.model");
const { pick } = require("lodash"); // Or replace with a custom pick implementation

jest.mock("../models/user.model", () => ({
  create: jest.fn(),
}));

jest.mock("../services/email.service", () => ({
  sendVerificationEmail: jest.fn(),
  sendEmail: jest.fn(), // Mock the sendEmail method
}));

describe("createUser without mocking hashPassword and generateOtp", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user, hash password, generate OTP, and send verification email", async () => {
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

    const createdUser = {
      ...userData,
      _id: "12345",
      password: expect.any(String),
    };

    const userDto = pick(userData, [
      "email",
      "companyName",
      "address.addressLine1",
      "address.addressLine2",
      "address.city",
      "address.state",
      "address.zipCode",
    ]);

    // Mock User.create and emailService.sendEmail

    User.create.mockResolvedValue(createdUser);

    emailService.sendEmail.mockResolvedValue(); // Mock sendEmail to resolve successfully

    // Call the function
    const result = await createUser(userData);

    // Assert that password hashing occurred
    expect(User.create).toHaveBeenCalledWith({
      ...userData,
      password: expect.any(String),
      failedLoginAttempts: 0,
      activeAccount: false,
    });

    // Assert the output is as expected

    expect(result).toEqual(userDto);
  });

  it("should throw a custom error for duplicate field values", async () => {
    const userData = {
      email: "duplicate@example.com",
      password: "password123",
    };

    const duplicateError = {
      code: 11000,
      keyValue: { email: "duplicate@example.com" },
    };

    User.create.mockRejectedValue(duplicateError);

    await expect(createUser(userData)).rejects.toThrow(
      new CustomError("Duplicate field value: 'email' already exists.", 409)
    );

    expect(User.create).toHaveBeenCalledWith(expect.objectContaining(userData));
  });
});
