const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

class User {
    constructor({ _id, prenom, nom, login, password, email, role = "pending", isValidated = false, description = "" }) {
        this._id = _id;
        this.prenom = prenom;
        this.nom = nom;
        this.login = login;
        this.password = password;
        this.email = email;
        this.isValidated = isValidated;
        this.role = role;
        this.description = description;
    }

    async save() {
        const db = getDB();
        const result = await db.collection("users").insertOne({
            prenom: this.prenom,
            nom: this.nom,
            login: this.login,
            password: this.password,
            email: this.email,
            isValidated: this.isValidated,
            role: this.role,
            description: this.description
        });

        // Recuperar el user insertado completo (con _id)
        const insertedUser = await db.collection("users").findOne({ _id: result.insertedId });

        return new User(insertedUser); // devuelve el user real insertado
    }

    static async create({ prenom, nom, login, email, password }) {
        const db = getDB();

        const existing = await this.findByLogin(login);
        if (existing) {
        throw new Error("Nom d'utilisateur déjà utilisé.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            prenom,
            nom,
            login,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return newUser;
    }
    static async findByLogin(login) {
        const db = getDB();
        const userData = await db.collection("users").findOne({ login });
        if (!userData) return null;
        return new User(userData);
    }

    static async findAllFiltered(validatedFilter) {
        const db = getDB();
        const query = {};

        if (validatedFilter === "true") query.isValidated = true;
        else if (validatedFilter === "false") query.isValidated = false;

        const users = await db.collection("users")
            .find(query, { projection: { password: 0 } })
            .toArray();

        return users.map(u => new User(u));
    }

    //validatePassword(inputPassword) {
    //    return inputPassword === this.password;
    //}

    static async updateRoleById(id, role) {
        const db = getDB();
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { role } }
        );
        return result;
    }

    

    static async validateById(id) {
        const db = getDB();

        let objectId;
        try {
            objectId = new ObjectId(id);
        } catch (err) {
            throw new Error("ID utilisateur invalide.");
        }

        const result = await db.collection("users").updateOne(
            { _id: objectId },
            { $set: { role: "member", isValidated: true } }
        );

        return result;
    }

    static async updateProfileById(id, updates) {
        const db = getDB();

        const { prenom, nom, description } = updates;

        if (!prenom || !nom || !description) {
            throw new Error("Champs manquants dans les données du profil.");
        }

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { prenom, nom, description } }
        );

        return result;
    }


    static async deleteById(id) {
        const db = getDB();
        const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
        return result;
    }

}

module.exports = User;
