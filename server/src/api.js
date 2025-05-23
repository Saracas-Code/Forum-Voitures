const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./entities/user");
const Message = require("./entities/messages");
const { getDB } = require("./db");
const { ObjectId } = require("mongodb");

const router = express.Router();

//** TYPICAL SERVICES : Login, Logout, SignUp, isLogged (vérifier la cookie) **//

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

    //const valid = user.validatePassword(password);
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // GARDER LA SESSION ACTUELLE. On ne garde que les informations qui sont inmutables et utiles pour le fonctionnement de la web
    req.session.user = {
        _id: user._id,
        login: user.login,
        email: user.email,
        role: user.role
    };

    req.session.save((err) => {
        if (err) {
            console.error("Erreur sauvegarde session :", err);
            return res.status(500).json({ message: "Erreur serveur lors de la connexion." });
        }

        // ✅ Solo se envía la respuesta una vez que la session está bien sauvegardée
        res.status(200).json({ message: "Connexion réussie", user: req.session.user });
    });
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

// Enregistrement
router.post("/register", async (req, res) => {

    const { prenom, nom, login, email, password } = req.body;

    const existing = await User.findByLogin(login);
    if (existing) {
        return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ prenom, nom, login, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Inscription réussie. En attente de validation." });
});

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


//** SERVICES DE MESSAGES : getMessages, addMessage, deleteMessage **//

// GET /api/messages?private=true|false&user=...&userLogin=...&keyword=...&startDate=...&endDate=...&all=true
// Retrouver les messages du forum privé et/ou forum publique
// Cette méthode permet aussi de retrouver les messages filtrés par autheur, mot clé, et dates de début et fin
router.get("/messages", async (req, res) => {
    const sessionUser = req.session?.user;
    if (!sessionUser) {
        return res.status(403).json({ error: "Utilisateur non connecté." });
    }

    const isPrivate = req.query.private === "true";
    const all = req.query.all === "true";
    const requestedUserId = req.query.user;

    try {
        if (all) {
            // Obligatoire : ID utilisateur
            if (!requestedUserId) {
                return res.status(400).json({ error: "Paramètre 'user' requis avec 'all=true'." });
            }

            // Interdire l'accès aux messages d'un autre utilisateur
            if (requestedUserId !== sessionUser._id) {
                return res.status(403).json({ error: "Vous ne pouvez accéder qu'à vos propres messages." });
            }

            const messages = await Message.findAllOfUser(requestedUserId);
            return res.json(messages);

        } else {
            // Recherche avec filtres normaux
            const messages = await Message.findWithFilters(req.query, isPrivate);
            return res.json(messages);
        }

    } catch (err) {
        console.error("Erreur GET /messages:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});



// POST /api/messages
// Ajouter un nouveau message
router.post("/messages", async (req, res) => {
    const { title, content, isPrivate = false } = req.body;

    const sessionUser = req.session?.user;
    if (!title || !content || !sessionUser?._id || !sessionUser.login) {
        return res.status(400).json({ error: "Données manquantes." });
    }

    if (isPrivate && sessionUser.role !== "admin") {
        return res.status(403).json({ error: "Accès interdit." });
    }

    try {
        const message = await new Message({
            title,
            content,
            user: new ObjectId(sessionUser._id),
            userLogin: sessionUser.login,
            isPrivate,
            date: new Date(),
            replyList: []
        }).save();

        res.status(201).json(message);
    } catch (err) {
        console.error("Erreur dans POST /api/messages:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


// DELETE /api/messages/:id
// Effacer un message propre
router.delete("/messages/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Message.deleteById(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Message non trouvé." });
        }

        res.status(200).json({ message: "Message supprimé avec succès." });
    } catch (err) {
        console.error("Erreur DELETE /messages/:id :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


//** SERVICES DE RÉPONSES : getMessages, addMessage, deleteMessage **//

// GET /api/replies?userId=...
// Retourner les replies d'un user
router.get("/replies", async (req, res) => {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: "Paramètre 'userId' requis." });

    try {
        const replies = await Message.findRepliesByUser(new ObjectId(userId));
        res.json(replies);
    } catch (err) {
        console.error("Erreur GET /replies:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


// DELETE /api/messages/:messageId/reply/:replyId
// Effacer une reply d'un message
router.delete("/messages/:messageId/reply/:replyId", async (req, res) => {
    const { messageId, replyId } = req.params;
    
    try {
        const result = await Message.deleteReplyById(messageId, replyId);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Réponse non trouvée ou déjà supprimée." });
        }

        res.status(200).json({ message: "Réponse supprimée avec succès." });
    } catch (err) {
        console.error("Erreur DELETE /reply:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// POST /api/messages/:id/reply
// Ajouter une reply à un message
router.post("/messages/:id/reply", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const sessionUser = req.session?.user;
    if (!content || !id || !sessionUser?._id || !sessionUser.login) {
        return res.status(400).json({ error: "Contenu ou ID manquant." });
    }

    try {
        const reply = await Message.addReply(id, content, sessionUser._id, sessionUser.login);
        if (!reply) {
            return res.status(404).json({ error: "Message non trouvé." });
        }
        res.status(201).json(reply);
    } catch (err) {
        console.error("Erreur POST /messages/:id/reply:", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


//** SERVICES DE USERS : getUsers, changeRole **//

// GET /api/users/me
// Récupérer les infos complètes du user courant
router.get("/users/me", async (req, res) => {
    if (!req.session?.user?._id) {
        return res.status(401).json({ error: "Utilisateur non connecté." });
    }

    try {
        const db = getDB();
        const user = await db.collection("users").findOne(
            { _id: new ObjectId(req.session.user._id) },
            { projection: { password: 0 } }
        );

        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Erreur GET /users/me :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// PUT /api/users/:id
// Mettre à jour les infos de profil d'un utilisateur
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;

    // Vérifie que l'utilisateur modifie uniquement son propre profil
    if (!req.session?.user || id !== req.session.user._id.toString()) {
        return res.status(403).send("L'utilisateur ne peut modifier que ses propres informations.");
    }

    try {
        const result = await User.updateProfileById(id, req.body);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé ou rien à mettre à jour." });
        }

        res.status(200).json({ message: "Profil mis à jour avec succès." });
    } catch (err) {
        console.error("Erreur PUT /users/:id :", err.message);
        res.status(400).json({ error: err.message });
    }
});


// GET /api/users?validated=true|false
// Récupérer les utilisateurs filtrés par validation
router.get("/users", async (req, res) => {
    try {
        const users = await User.findAllFiltered(req.query.validated);
        res.json(users);
    } catch (err) {
        console.error("Erreur GET /users :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// PUT /api/users/:id/role
// Changer le rôle d'un user
router.put("/users/:id/role", async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (req.session?.user?.role != "admin"){
        return res.status(403).send("Uniquement un admin peut modifier le role d'un user");
    }
        

    if (!role || !["admin", "member"].includes(role)) {
        return res.status(400).json({ error: "Rôle invalide." });
    }

    try {
        const result = await User.updateRoleById(id, role);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Rôle mis à jour avec succès." });
    } catch (err) {
        res.status(500).json({ error: err.message || "Erreur serveur." });
    }
});

// PUT /api/users/:id/validate
// Valider un utilisateur dans le forum
router.put("/users/:id/validate", async (req, res) => {
    const { id } = req.params;

    if (req.session?.user?.role != "admin"){
        return res.status(403).send("Uniquement un admin peut valider un user");
    }

    try {
        const result = await User.validateById(id);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        res.status(200).json({ message: "Utilisateur validé avec succès." });
    } catch (err) {
        console.error("Erreur PUT /users/:id/validate :", err.message);
        res.status(500).json({ error: err.message || "Erreur serveur." });
    }
});


// DELETE /api/users/:id
// Rejecter la petition d'un utilisateur d'accès au forum
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    if (req.session?.user?.role != "admin"){
        return res.status(403).send("Uniquement un admin peut rejecter un user");
    }

    try {
        result = await User.deleteById(id);

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (err) {
        console.error("Erreur DELETE /users/:id :", err);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

// GET /api/users/pending-count
// Compter les users qui ne sont pas validés
router.get("/users/pending-count", async (req, res) => {
    try {
        const db = getDB();
        const count = await db.collection("users").countDocuments({ isValidated: false });
        res.status(200).json({ count });
    } catch (err) {
        console.error("Erreur GET /users/pending-count :", err.message);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


module.exports = router;
