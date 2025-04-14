const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const analyzeDocument = async (text) => {
  try {
    const prompt = `For the following text do the following:
        - Extract the fields if present: firstName, lastName, expirationDate, policyNumber.
        - Determine if the document is valid or not. To do this:
            - If the expirationDate is in the past, the document is invalid.
            - If the document appears to be unrelated to insurance, for example: random text or irrelevant information, the document is invalid.
        - Provide a confidence score between 0 and 1.
        - Provide a reason for why the document is valid or invalid.

        - Respond strictly in raw JSON format with the following structure:

        {
            "firstName": "string",
            "lastName": "string",
            "policyNumber": "string",
            "expirationDate": "YYYY-MM-DD or null",
            "valid": boolean,
            "confidenceScore": 0-1,
            "reason": "string"
        }

        Document text:

        ${text}`;

    // use groq to analyze the extracted text
    const groqResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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
    return parsedAnalysis;
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error("Failed to analyze document.");
  }
};

module.exports = {
  analyzeDocument,
};