const express = require("express");
const { getDB } = require("./db");

const router = express.Router();

// Enregistrement
router.post("/register", async (req, res) => {
    const { prenom, nom, login, password } = req.body;

    const db = getDB();

    // Tester si l'user existe déjà dans la base de données
    const exists = await db.collection("users").findOne({ login });

    if (exists) {
        return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const newUser = {
        prenom,
        nom,
        login,
        password,         
        isValidated: false // Après les admins changeront ça
    };

    // s'il n'existe pas, ON L'AJOUTE À LA BASE DE DONNÉES
    await db.collection("users").insertOne(newUser);

    // Status 201 (Created) pour indiquer qu'on a bien fait l'inscription
    res.status(201).json({ message: "Inscription réussie. En attente de validation." });
});

// Connexion
router.post("/login", async (req, res) => {
    const { login, password } = req.body;

    const db = getDB();
    const user = await db.collection("users").findOne({ login });

    // Tester si l'user existe
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Tester si l'user est validé par un admin
    if (!user.isValidated) {
        return res.status(403).json({ message: "Compte non validé par l’admin." });
    }

    // Tester si le mot de passe est correct
    if (user.password !== password) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    res.status(200).json({ message: "Connexion réussie", user: { login: user.login } });
});

module.exports = router;
