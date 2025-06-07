const axios = require("axios");
const SYSTEM_PROMPT = require("../prompt/prompt");

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function analyzeContract(contractText) {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: contractText }],
          },
        ],
        system_instruction: {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }],
        },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
  } catch (err) {
    console.error("Erreur dans geminiService:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { analyzeContract };
