const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeDocument = async (text) => {
  try {
    const prompt = `Analyze the following insurance document for potential fraud and extract key information:

            1. Extract these specific fields (if present):
               - firstName: The first name of the policy holder
               - lastName: The last name of the policy holder
               - policyNumber: The insurance policy identification number
               - expirationDate: The policy expiration date

            2. Fraud Detection Checks:
               - Check for inconsistencies in personal information
               - Look for suspicious patterns in policy details
               - Identify potential document alterations or tampering
               - Flag unusual policy terms or conditions
               - Check for mismatched or invalid dates
               - Verify policy number format and validity
               
            3. Validation Rules:
               IMPORTANT - Date Validation:
               - Today's date is: ${new Date().toISOString().split("T")[0]}
               - You MUST compare the expirationDate with today's date
               - The document is automatically INVALID if expirationDate is before today
               
               Additional Validation:
               - The document is INVALID if:
                  * Any required field (firstName, lastName, policyNumber) is missing
                  * The content is not insurance-related
                  * Any signs of document tampering or alterations are detected
                  * Policy number format is invalid or suspicious
               - The document is VALID only if:
                  * ALL required fields are present AND
                  * expirationDate is either today or a future date AND
                  * document content is insurance-related AND
                  * no fraud indicators are detected

            3. Confidence and Fraud Risk Scoring:
               - Score 1.0: All fields valid, no fraud indicators
               - Score 0.7-0.9: Most fields valid, minor inconsistencies
               - Score 0.4-0.6: Some fields missing or suspicious patterns
               - Score 0.0-0.3: Major red flags or likely fraudulent

            Return the analysis in this exact JSON format:
            {
                "firstName": "string or null",
                "lastName": "string or null",
                "policyNumber": "string or null",
                "expirationDate": "YYYY-MM-DD or null",
                "valid": boolean,
                "confidenceScore": number between 0 and 1,
                "fraudIndicators": ["list of suspicious elements found"],
                "riskLevel": "LOW|MEDIUM|HIGH",
                "reason": "detailed explanation including fraud analysis and date validation"
            }

            Document text:

        ${text}`;

    // use groq to analyze the extracted text
    const groqResponse = await groq.chat.completions.create({
      model: process.env.LLM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a fraud detection expert. Carefully analyze the document for authenticity and respond strictly in raw JSON format.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
    });

    // extract and clean response
    let analysis = groqResponse.choices?.[0]?.message?.content;

    if (!analysis) {
      throw new Error("Groq API did not return a valid response.");
    }

    // Remove Markdown-style formatting if present
    analysis = analysis.replace(/```json|```/g, "").trim();

    const parsedAnalysis = JSON.parse(analysis);

    // Add date validation and fraud risk assessment
    if (parsedAnalysis.expirationDate) {
      const today = new Date().toISOString().split("T")[0];
      const expirationDate = parsedAnalysis.expirationDate;

      if (expirationDate < today) {
        parsedAnalysis.valid = false;
        parsedAnalysis.fraudIndicators.push("Expired document");
        parsedAnalysis.reason = `Document expired. Expiration date (${expirationDate}) is before today (${today}). ${parsedAnalysis.reason}`;
      }
    }

    // Determine risk level based on confidence score and fraud indicators
    if (
      parsedAnalysis.confidenceScore >= 0.8 &&
      parsedAnalysis.fraudIndicators.length === 0
    ) {
      parsedAnalysis.riskLevel = "LOW";
    } else if (
      parsedAnalysis.confidenceScore >= 0.5 ||
      parsedAnalysis.fraudIndicators.length <= 2
    ) {
      parsedAnalysis.riskLevel = "MEDIUM";
    } else {
      parsedAnalysis.riskLevel = "HIGH";
    }

    return parsedAnalysis;
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Failed to analyze document.");
  }
};

module.exports = {
  groq,
  analyzeDocument,
};
