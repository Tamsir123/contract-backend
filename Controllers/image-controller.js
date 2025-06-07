// filepath: /home/tamsir/Desktop/contract-backend/Controllers/image-controller.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Pour génération de texte uniquement, pas d'image directe avec Gemini
const MODEL_NAME = "gemini-1.5-pro";

exports.generateImage = async (req, res) => {
  const { instruction } = req.body;

  if (!instruction) {
    return res.status(400).json({ error: "Instruction manquante pour l'image." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Note: Gemini 1.5 Pro ne génère pas directement des images, 
    // ce code va simplement renvoyer une réponse textuelle
    const result = await model.generateContent([
      { role: "user", parts: [{ text: `Génère une description pour une image selon l'instruction suivante : ${instruction}` }] }
    ]);

    const response = await result.response;
    const text = response.text();

    // Pour le moment, on renvoie juste le texte de description
    res.json({ result: text, note: "Gemini API ne génère pas directement des images. Voici une description textuelle." });
  } catch (err) {
    console.error("Erreur lors de la génération d'image :", err.message);
    res.status(500).json({ error: "Erreur lors de la génération d'image." });
  }
};
