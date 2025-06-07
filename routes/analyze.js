const express = require("express");
const router = express.Router();
const { analyzeContract } = require("../services/geminiService");

router.post("/", async (req, res) => {
  const { contractText } = req.body;

  if (!contractText) {
    return res.status(400).json({ error: "Texte du contrat manquant." });
  }

  try {
    const result = await analyzeContract(contractText);
    res.json({ summary: result });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l’analyse du contrat." });
  }
});

module.exports = router;
