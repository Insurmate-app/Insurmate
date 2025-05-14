// tests/user.controller.int.test.js
require("../setup.js");
const {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  expect,
} = require("@jest/globals");
const { GenericContainer } = require("testcontainers");
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const http = require("http");
const userRoutes = require("../../routes/user.route.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("../../models/user.model.js"); // Add this line

let server;
let mongoContainer;
let mongoUri;
let testApp;

describe("User Controller Integration Tests", () => {
  beforeAll(async () => {
    mongoContainer = await new GenericContainer("mongo")
      .withExposedPorts(27017)
      .start();

    const mongoPort = mongoContainer.getMappedPort(27017);
    const mongoHost = mongoContainer.getHost();
    mongoUri = `mongodb://${mongoHost}:${mongoPort}/test_db`;

    // Create a fresh Express app instance for testing
    testApp = express();
    testApp.use(express.json());
    testApp.use(cors());
    testApp.use(cookieParser());
    testApp.use("/v1/api/user", userRoutes);

    // Connect to test database
    await mongoose.connect(mongoUri);

    server = http.createServer(testApp);
    await new Promise((resolve) => server.listen(0, resolve));
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
    await mongoContainer.stop();
    await new Promise((resolve) => server.close(resolve));
    // Add a small delay to ensure all connections are properly closed
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Update all request(app) to request(testApp)
  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const userData = {
        email: "test_admin@wecare-insurance.com",
        password: "Test1234!",
        companyName: "We cArE_Insurance",
        firstName: "Toe",
        lastName: "Arkar",
        wallet: "Dummy",
        address: {
          addressLine1: "123 Main St",
          addressLine2: "Apt 101",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
      };

      const response = await request(testApp)
        .post("/v1/api/user/create")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("email", userData.email);
      expect(response.body).not.toHaveProperty("password");
      expect(response.body.companyName).toBe("WE CARE INSURANCE");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login user and return token", async () => {
      const userData = {
        email: "test@example.com",
        password: "Password123!",
        firstName: "Test",
        lastName: "User",
      };
      await request(testApp).post("/api/users").send(userData);

      const response = await request(testApp)
        .post("/api/users/login")
        .send({ email: userData.email, password: userData.password })
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("POST /api/users/verify", () => {
    it("should verify user with correct OTP", async () => {
      const userData = {
        email: "test@example.com",
        password: "Password123!",
        firstName: "Test",
        lastName: "User",
      };
      await request(testApp).post("/api/users").send(userData);
      const user = await User.findOne({ email: userData.email });

      const response = await request(testApp)
        .post("/api/users/verify")
        .send({ email: userData.email, otpToken: user.otpToken })
        .expect(200);

      expect(response.text).toBe('"Verification Successful."');
    });
  });

  describe("POST /api/users/logout", () => {
    it("should logout user and clear cookie", async () => {
      const response = await request(testApp)
        .post("/api/users/logout")
        .expect(200);

      expect(response.body.message).toBe("Logged out successfully.");
      expect(response.headers["set-cookie"]).toBeDefined();
    });
  });
});
