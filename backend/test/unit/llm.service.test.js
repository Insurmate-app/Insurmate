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

const { after } = require("lodash");
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
});
