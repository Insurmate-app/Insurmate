const Groq = require("groq-sdk");
//require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeDocument = async (text) => {
  try {
    const prompt = `Analyze the following insurance document and:

            1. Extract these specific fields (if present):
               - firstName: The first name of the policy holder
               - lastName: The last name of the policy holder
               - policyNumber: The insurance policy identification number
               - expirationDate: The policy expiration date

            2. Validation Rules:
               IMPORTANT - Date Validation:
               - Today's date is: ${new Date().toISOString().split("T")[0]}
               - You MUST compare the expirationDate with today's date
               - The document is automatically INVALID if expirationDate is before today
               
               Additional Validation:
               - The document is INVALID if:
                  * Any required field (firstName, lastName, policyNumber) is missing
                  * The content is not insurance-related
               - The document is VALID only if:
                  * ALL required fields are present AND
                  * expirationDate is either today or a future date AND
                  * document content is insurance-related

            3. Confidence Scoring:
               - Score 1.0: All fields present, properly formatted, and expiration date is valid
               - Score 0.7-0.9: Most fields present but some uncertainty
               - Score 0.4-0.6: Some fields missing or unclear
               - Score 0.0-0.3: Document appears unrelated to insurance

            Return the analysis in this exact JSON format:
            {
                "firstName": "string or null",
                "lastName": "string or null",
                "policyNumber": "string or null",
                "expirationDate": "YYYY-MM-DD or null",
                "valid": boolean,
                "confidenceScore": number between 0 and 1,
                "reason": "detailed explanation including the date comparison result"
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
            "Carefully analyze the document and respond strictly in raw JSON format.",
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
    
    // Add date validation
    if (parsedAnalysis.expirationDate) {
      const today = new Date().toISOString().split('T')[0];
      const expirationDate = parsedAnalysis.expirationDate;
      
      if (expirationDate < today) {
        parsedAnalysis.valid = false;
        parsedAnalysis.reason = `Document expired. Expiration date (${expirationDate}) is before today (${today}). ${parsedAnalysis.reason}`;
      }
    }

    return parsedAnalysis;
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Failed to analyze document.");
  }
};

module.exports = {
  analyzeDocument,
};
