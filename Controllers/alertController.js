// const { analyzeContractWithAlert } = require("../services/geminiService");

// // Contrôleur pour l'analyse avec alerte personnalisée
// exports.analyzeAlert = async (req, res) => {
//   try {
//     const { contractText, userPreference } = req.body;
//     if (!contractText || !userPreference) {
//       return res.status(400).json({ error: "Le texte du contrat et la préférence utilisateur sont requis." });
//     }
//     const result = await analyzeContractWithAlert(contractText, userPreference);
//     res.json({ result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
