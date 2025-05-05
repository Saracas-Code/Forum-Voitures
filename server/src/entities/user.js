const { getDB } = require("../db");

class User {
    constructor({ prenom, nom, login, password, role = "pending", isValidated = false }) {
        this.prenom = prenom;
        this.nom = nom;
        this.login = login;
        this.password = password;
        this.isValidated = isValidated;
        this.role = role
    }

    async save() {
        const db = getDB();
        await db.collection("users").insertOne({
            prenom: this.prenom,
            nom: this.nom,
            login: this.login,
            password: this.password,
            isValidated: this.isValidated,
            role: this.role
        });
    }

    static async findByLogin(login) {
        const db = getDB();
        const userData = await db.collection("users").findOne({ login });
        if (!userData) return null;
        return new User(userData);
    }

    validatePassword(inputPassword) {
        return inputPassword === this.password;
    }
}

module.exports = User;
