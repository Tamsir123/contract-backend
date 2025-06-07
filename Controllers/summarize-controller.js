const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro";

exports.summarize = async (req, res) => {
  const { contractText } = req.body;

  try {
    const prompt = fs.readFileSync(path.join(__dirname, "../prompt/summarizePrompt.txt"), "utf-8");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent([prompt, contractText]);
    const response = await result.response;
    const text = response.text();

    res.json({ result: text });
  } catch (error) {
    console.error("Erreur Gemini API (summarize):", error.message);
    res.status(500).json({ error: "Erreur lors de l’analyse du contrat." });
  }
};
