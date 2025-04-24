/*
 * LLM Service Unit Tests
 *
 * This file contains unit tests for the LLM Service module which handles:
 * - checking doucument expiration date
 * - checking document for relevance (i.e. insurance-related)
 * - checks if Groq API outputted a valid response
 *
 * Dependencies:
 * - llm.service.js: Core user management functions
 * - groq-sdk: Groq API
 */

const mockCreate = jest.fn(); // Mock the groq-sdk module instead of using the real one

jest.mock("groq-sdk", () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    };
  });
});

const { analyzeDocument } = require("../../services/llm.service");

describe("LLM service guarantees a response for a valid or invalid document as well any errors that may happen with the service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return valid = true for an insurance document with a future expiration date", async () => {
    const mockGroqResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              firstName: "Patrick",
              lastName: "Doe",
              policyNumber: "123456789",
              expirationDate: "2050-01-01",
              valid: true,
              confidenceScore: 0.95,
              reason:
                "The document is valid. It is insurance related, and the expiration date is in the future.",
            }),
          },
        },
      ],
    };

    mockCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeDocument("This is a test document.");
    expect(result).toEqual({
      firstName: "Patrick",
      lastName: "Doe",
      policyNumber: "123456789",
      expirationDate: "2050-01-01",
      valid: true,
      confidenceScore: 0.95,
      reason:
        "The document is valid. It is insurance related, and the expiration date is in the future.",
    });
  });

  it("should return valid = false for an insurance document with a past expiration date", async () => {
    const mockGroqResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              firstName: "Patrick",
              lastName: "Doe",
              policyNumber: "123456789",
              expirationDate: "2020-01-01",
              valid: true, // this should be false, the service should handle this
              confidenceScore: 0.95,
              reason: "The document is valid and all fields are present",
            }),
          },
        },
      ],
    };

    mockCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeDocument("This is a expired document.");

    expect(result.valid).toBe(false);
    expect(result.reason).toContain("Document expired.");
  });

  it("should return valid = false for a non-insurance document with missing fields", async () => {
    const mockGroqResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              firstName: "Jim",
              lastName: null,
              policyNumber: null,
              expirationDate: null,
              valid: false,
              confidenceScore: 0.2,
              reason:
                "Document lacks insurance-related content and required fields.",
            }),
          },
        },
      ],
    };

    mockCreate.mockResolvedValue(mockGroqResponse);

    const result = await analyzeDocument("Not a real insurance document.");

    expect(result.valid).toBe(false);
    expect(result.firstName).toBe("Jim");
    expect(result.lastName).toBe(null);
    expect(result.policyNumber).toBe(null);
    expect(result.reason).toContain("required fields");
  });

  it("should throw an error if the Groq API call fails at some point", async () => {
    mockCreate.mockRejectedValue(new Error("some groq error"));

    await expect(analyzeDocument("example document")).rejects.toThrow(
      "Failed to analyze document."
    );
  });
});
