const express = require("express");
const User = require("./entities/user");
const Message = require("./entities/messages");
const { getDB } = require("./db");

const router = express.Router();

// Vérifier la cookie active
router.get("/isLogged", (req, res) => {
    if (req.session.user) {
        res.json({
            logged: true,
            user: req.session.user // todo el objeto user guardado en sesión
        });
    } else {
        res.json({ logged: false });
    }
});

// Enregistrement
router.post("/register", async (req, res) => {
    const { prenom, nom, login, email, password } = req.body;

    const existing = await User.findByLogin(login);
    if (existing) {
        return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const newUser = new User({ prenom, nom, login, email, password });
    await newUser.save();

    res.status(201).json({ message: "Inscription réussie. En attente de validation." });
});

// Connexion
router.post("/login", async (req, res) => {
    const { login, password } = req.body;

    const user = await User.findByLogin(login);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (!user.isValidated) {
        return res.status(403).json({ message: "Compte non validé par l’admin." });
    }

    const valid = user.validatePassword(password);
    if (!valid) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    req.session.user = {
        login: user.login,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role,
        description: user.description,
    }; // GARDER LA SESSION ACTUELLE

    res.status(200).json({ message: "Connexion réussie", user: req.session.user });
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.clearCookie("connect.sid"); // Nombre por defecto del cookie de session
        res.json({ message: "Déconnexion réussie" });
    });
});

// GET /api/forum?private=true|false . Retrouver les messages du forum publique et du forum privé
router.get("/forum", async (req, res) => {
    const db = getDB();
    const isPrivate = req.query.private === "true";

    if (isPrivate && req.session.role !== "admin") {
        return res.status(403).json({ error: "Accès interdit." });
    }

    try {
        const messages = await Message.findAllByPrivacy(isPrivate);
        res.json(messages);
    } catch (err) {
        console.error("Erreur dans /api/forum :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// POST /api/forum?
router.post("/forum", async (req, res) => {
    const { title, content, isPrivate } = req.body;
    const user = req.session?.username || "inconnu"; // puedes ajustar esto

    if (!content || typeof isPrivate !== "boolean") {
        return res.status(400).json({ error: "Contenu ou isPrivate invalide." });
    }

    if (isPrivate && req.session?.role !== "admin") {
        return res.status(403).json({ error: "Accès interdit." });
    }

    try {
        const message = new Message({
            title,
            content,
            user,
            isPrivate
        });

        await message.save();
        res.status(201).json(message);
    } catch (err) {
        console.error("Erreur dans POST /api/forum:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

module.exports = router;
