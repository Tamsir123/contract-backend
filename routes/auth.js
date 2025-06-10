const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

// 🔐 Inscription
router.post("/inscription", async (req, res) => {
  const {
    name,
    email,
    password,
    birth_date,
    gender,
    user_type,
    preferences,
    accept_terms,
  } = req.body;

  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ message: "Email déjà utilisé." });

    // Map English values to French ENUM values
    const userTypeMapping = {
      'individual': 'particulier',
      'professional': 'professionnel',
      'company': 'entreprise',
      'particulier': 'particulier',
      'professionnel': 'professionnel',
      'entreprise': 'entreprise'
    };

    const genderMapping = {
      'male': 'homme',
      'female': 'femme',
      'other': 'autre',
      'homme': 'homme',
      'femme': 'femme',
      'autre': 'autre'
    };

    const mappedUserType = userTypeMapping[user_type] || 'particulier';
    const mappedGender = genderMapping[gender] || null;
    const mappedAcceptTerms = accept_terms === true || accept_terms === 'true' || accept_terms === 1;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userResult] = await pool.query(
      `INSERT INTO users (name, email, password_hash, birth_date, gender, user_type, accept_terms)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, birth_date, mappedGender, mappedUserType, mappedAcceptTerms]
    );

    const userId = userResult.insertId;

    if (Array.isArray(preferences)) {
      for (const label of preferences) {
        const [prefRow] = await pool.query("SELECT id FROM preferences WHERE label = ?", [label]);
        if (prefRow.length) {
          await pool.query("INSERT INTO user_preferences (user_id, preference_id) VALUES (?, ?)", [
            userId,
            prefRow[0].id,
          ]);
        }
      }
    }

    res.status(201).json({ message: "Utilisateur inscrit avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🔓 Connexion
router.post("/connexion", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Utilisateur non trouvé." });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
