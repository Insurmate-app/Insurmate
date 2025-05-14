/*
 * Name-matcher Service Unit Tests
 *
 * This file contains unit tests for the name-matcher Service module which handles:
 * - Utilizing the Levenshtein algorithm to unify/standardize company names across our database
 * - Utilizing the Jaccard index algorithm to unify/standardize company names across our database
 * - Use the combined analysis from the algorithms to determine if a company name is similar to an existing one, and which one to save
 */

const {
  calculateLevenshteinDistance,
  splitAndProcess,
  checkSimilarCompanyName,
  calculateJaccardSimilarity,
} = require("../../services/name-matcher.service");

/**
 * Tests LevenshteinDistance function:
 * - Tests for the Levenshtein distance between two strings
 *
 */
describe("calculateLevenshteinDistance", () => {
  it("should return 2 for these strings", () => {
    // Setup
    let str1 = "We Care Insurance";
    let str2 = "We_Care_Insurance";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBe(2);
  });

  it("should return 0 for these strings (identical)", () => {
    // Setup
    let str1 = "WeCare";
    let str2 = "WeCare";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBe(0);
  });

  // Test for completely different strings
  it("should return > 4 for these strings", () => {
    // Setup
    let str1 = "WeCare";
    let str2 = "TestCompany";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBeGreaterThan(4);
  });

  it("should return 0 for two empty strings", () => {
    // Setup
    let str1 = "";
    let str2 = "";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBe(0);
  });

  it("should return 6, proving it accounts for case sensitivity as a difference", () => {
    // Setup
    let str1 = "WECARE";
    let str2 = "wecare";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBe(6);
  });

  it("should return 2, with one empty string", () => {
    // Setup
    let str1 = "";
    let str2 = "We";
    // Execute
    const result = calculateLevenshteinDistance(str1, str2);
    // Assert
    expect(result).toBe(2);
  });
});

/**
 * Tests splitAndProcess function:
 * - Test that the string gets processed correctly and converted to uppercase
 * - Test for splitting up mixed case strings depending on if there's a one letter word after it
 *
 */

describe("splitAndProcess", () => {
  it("should convert to uppercase", async () => {
    // Setup
    let testStr = "we care";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WE CARE");
  });

  it("should trim whitespace", async () => {
    // Setup
    let testStr = "    wecare     ";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WECARE");
  });

  it("should replace underscores with spaces", async () => {
    // Setup
    let testStr = "We_Care";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WE CARE");
  });

  it("should remove commas or brackets", async () => {
    // Setup
    let testStr = "[We],Care";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WE CARE");
  });

  it("should split up mixed case string without a one letter after it", async () => {
    // Setup
    let testStr = "WeCareInsurance";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WE CARE INSURANCE");
  });

  it("should not split up mixed case string if there is a one letter word after it", async () => {
    // Setup
    let testStr = "WeCareInsurance B Corp";
    // Execute
    const result = await splitAndProcess(testStr);
    // Assert
    expect(result).toBe("WECAREINSURANCE B CORP");
  });
});

/**
 * Tests calculateJaccardSimilarity function:
 * - Tests for the Jaccard index score between two strings
 *
 */

describe("calculateJaccardSimilarity", () => {
  it("should produce a Jaccard index result higher than 0.85", () => {
    // Setup
    let str1 = "We Care Insurance";
    let str2 = "We Care Insurance Inc.";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBeGreaterThan(0.85);
  });

  it("should produce a Jaccard index result of 1.0, indicating identical strings", () => {
    // Setup
    let str1 = "We Care Insurance";
    let str2 = "We Care Insurance";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBe(1);
  });

  it("should produce a Jaccard index result of 1.0(identical), indicating case-insensitivity for identical strings", () => {
    // Setup
    let str1 = "We Care Insurance";
    let str2 = "WE CARE INSURANCE";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBe(1);
  });

  // Test for completely different strings
  it("should produce a Jaccard index result of 0.0, indicating no match at all", () => {
    // Setup
    let str1 = "abcde123";
    let str2 = "fghijk456";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBe(0.0);
  });

  it("should produce a Jaccard index result of 0.0, with one string empty", () => {
    // Setup
    let str1 = "WeCare";
    let str2 = "";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBe(0.0);
  });

  it("should calculate the Jaccard index correctly for similar but not identical strings", () => {
    // Setup
    let str1 = "apple";
    let str2 = "pear";
    // Execute
    const result = calculateJaccardSimilarity(str1, str2);
    // Assert
    expect(result).toBeCloseTo(0.6);
  });
});

/**
 * Tests checkSimilarCompanyName function:
 * - Tests to determine if a company name is similar to an existing one and returns it if so
 * - Otherwise just returns the entered company name
 *
 */

describe("checkSimilarCompanyName", () => {
  // Make an array of existing company names to test with
  const existingCompanyNames = ["we care insurance", "Test Company"];

  // Mock console.log to prevent actual logging during tests
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should return the most similar company name from the existing companies", async () => {
    // Setup
    let enteredCompanyNameTest = "we care insurance inc.";
    // Execute
    const result = await checkSimilarCompanyName(
      existingCompanyNames,
      enteredCompanyNameTest
    );
    // Assert
    expect(result).toBe("we care insurance");
  });

  // Another similar test to ensure accuracy with WeCare
  it("should return the most similar company name from the existing companies", async () => {
    // Setup
    let enteredCompanyNameTest = "We_Care Insurance";
    // Execute
    const result = await checkSimilarCompanyName(
      existingCompanyNames,
      enteredCompanyNameTest
    );
    // Assert
    expect(result).toBe("we care insurance");
  });

  it("should return the exact match if found", async () => {
    // Setup
    let enteredCompanyNameTest = "Test Company";
    // Execute
    const result = await checkSimilarCompanyName(
      existingCompanyNames,
      enteredCompanyNameTest
    );
    // Assert
    expect(result).toBe("Test Company");
  });

  it("should return the entered company name normalized to uppercase if no similar match found", async () => {
    // Setup
    let enteredCompanyNameTest = "Global Corp Inc";
    // Execute
    const result = await checkSimilarCompanyName(
      existingCompanyNames,
      enteredCompanyNameTest
    );
    // Assert
    expect(result).toBe("GLOBAL CORP INC");
  });

  // Test for the existingCompanyNames being empty
  it("should return the entered company name normalized to uppercase when existing company names list is empty", async () => {
    // Setup
    const emptyExistingCompanyNames = [];
    let enteredCompanyNameTest = "We Care";
    // Execute
    const result = await checkSimilarCompanyName(
      emptyExistingCompanyNames,
      enteredCompanyNameTest
    );
    // Assert
    expect(result).toBe("WE CARE");
  });
});
