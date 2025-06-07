// const axios = require("axios");
// const SYSTEM_PROMPT = require("../prompt/prompt");

// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// async function analyzeContract(contractText) {
//   try {
//     const response = await axios.post(
//       `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: contractText }],
//           },
//         ],
//         system_instruction: {
//           role: "system",
//           parts: [{ text: SYSTEM_PROMPT }],
//         },
//       }
//     );

//     return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
//   } catch (err) {
//     console.error("Erreur dans geminiService:", err.response?.data || err.message);
//     throw err;
//   }
// }

// module.exports = { analyzeContract };


const genai = require("@google/generative-ai");

const MODEL_TEXT = "gemini-1.5-pro";
const MODEL_IMAGE = "models/gemini-1.5-flash";

const client = new genai.GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runTextModel(prompt, inputText) {
  const model = client.getGenerativeModel({ model: MODEL_TEXT });
  const result = await model.generateContent([prompt, inputText]);
  return result.response.text();
}

async function runImageModel(prompt, base64Image) {
  const model = client.getGenerativeModel({ model: MODEL_IMAGE });
  const imagePart = {
    inlineData: {
      mimeType: "image/png",
      data: base64Image,
    },
  };
  const result = await model.generateContent([prompt, imagePart]);
  return result.response.text();
}

module.exports = {
  runTextModel,
  runImageModel,
};
