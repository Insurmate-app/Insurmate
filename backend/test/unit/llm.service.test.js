/*
 * LLM Service Unit Tests
 *
 * This file contains unit tests for the LLM service module which handles:
 * - handling insurance document validation responses from the Groq API
 * - ensuring expiration dates are correctly validated
 * - catching and responding to groq API errors or invalid responses
 *
 * Dependencies:
 * - llm.service.js: Insurance document validation service
 * - groq-sdk: uses real API calls to the Groq service
 * - jest: Testing framework
 */
require("dotenv").config({ path: __dirname + "/../../.env" });

const { analyzeDocument, groq } = require("../../services/llm.service");

describe("LLM service guarantees a response for a valid or invalid document as well any errors that may happen with the service", () => {
  it("should return valid = true and LOW risk for a clean insurance document", async () => {
    const document = `
      Insurance Policy
      Name: Patrick Doe
      Policy Number: 123456789
      Expiration Date: 2050-01-01
    `;

    const result = await analyzeDocument(document); // send to service

    expect(result.valid).toBe(true);
    expect(result.riskLevel).toBe("LOW");
    expect(result.firstName).toBe("Patrick");
    expect(result.lastName).toBe("Doe");
    expect(result.policyNumber).toBe("123456789");
    expect(result.expirationDate).toBe("2050-01-01");
    expect(Array.isArray(result.fraudIndicators)).toBe(true);
  });

  it("should return valid = false for an insurance document with a past expiration date", async () => {
    const document = `
      Insurance Policy
      Name: Jane Doe
      Policy Number: 987654321
      Expiration Date: 2000-01-01
    `; // outdated policy

    const result = await analyzeDocument(document);

    expect(result.valid).toBe(false);
    expect(result.fraudIndicators).toContain("Expired document");
    expect(result.reason).toContain("Document expired");
  });

  it("should return valid = false for a non-insurance document with missing fields", async () => {
    const document = `
      Cake Recipe:
      Ingredients:
      - flour
      - sugar
      - eggs
    `; // not an insurance document

    const result = await analyzeDocument(document);

    expect(result.valid).toBe(false);
    expect(result.riskLevel === "HIGH" || result.riskLevel === "MEDIUM").toBe(
      true
    );
  });

  it("should throw an error if the Groq API responds with nothing", async () => {
    const spy = jest.spyOn(groq.chat.completions, "create").mockResolvedValue({
      choices: [
        {
          message: {
            content: null,
          },
        },
      ],
    });

    await expect(analyzeDocument("test Document")).rejects.toThrow(
      "Failed to analyze document."
    );

    spy.mockRestore();
  });
});
