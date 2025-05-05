const express = require("express");
const User = require("./entities/user");

const router = express.Router();

// Enregistrement
router.post("/register", async (req, res) => {
    const { prenom, nom, login, password } = req.body;

    const existing = await User.findByLogin(login);
    if (existing) {
        return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const newUser = new User({ prenom, nom, login, password });
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

    req.session.user = { login: user.login, role: user.role }; // GARDER LA SESSION
    res.status(200).json({ message: "Connexion réussie", user: { login: user.login } });
});

router.get("/isLogged", (req, res) => {
    if (req.session.user) {
        res.json({ logged: true, user: req.session.user.login, role: req.session.user.role });
    } else {
        res.json({ logged: false });
    }
});


module.exports = router;
