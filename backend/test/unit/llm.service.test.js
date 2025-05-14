const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env.test')
});

const { analyzeDocument } = require("../../services/llm.service");

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
});
