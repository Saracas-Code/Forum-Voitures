const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

class Message {
    constructor({ _id, title, content, user, date = new Date(), isPrivate = false, replyList = [] }) {
        this._id = _id; 
        this.title = title;
        this.content = content;
        this.date = new Date(date);
        this.user = user;
        this.isPrivate = isPrivate;
        this.replyList = replyList;
    }

    async save() {
        const db = getDB();
        const result = await db.collection("messages").insertOne({
            title: this.title,
            content: this.content,
            date: this.date,
            user: this.user,
            isPrivate: this.isPrivate,
            replyList: this.replyList
        });

        // Recuperar el mensaje insertado completo (con _id)
        const insertedMessage = await db.collection("messages").findOne({ _id: result.insertedId });

        return new Message(insertedMessage); // devuelve el mensaje real insertado
    }


    static async findAllByPrivacy(isPrivate) {
        const db = getDB();
        const messages = await db.collection("messages")
            .find({ isPrivate })
            .sort({ date: -1 }) // Ordre des messages
            .toArray();

        // Ordonner chaque replyList par date descendante
        messages.forEach(msg => {
            if (Array.isArray(msg.replyList)) {
                msg.replyList.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        });

        return messages.map(msg => new Message(msg));
    }

    static async addReply(messageId, replyContent, replyUser) {
        const db = getDB();
        const reply = {
            _id: new ObjectId(),
            content: replyContent,
            date: new Date(),
            user: replyUser
        };

        const result = await db.collection("messages").updateOne(
            { _id: new ObjectId(messageId) },   // On utilise l'id du message pour l'ajouter une réponse
            { $push: { replyList: reply } }
        );

        return result.modifiedCount > 0 ? reply : null;
    }


    static async findWithFilters(queryParams, isPrivate) {
        const db = getDB();
        const query = { isPrivate };

        if (queryParams.user) query.user = queryParams.user;

        if (queryParams.keyword) {
            const regex = new RegExp(queryParams.keyword, "i");
            query.$or = [{ title: regex }, { content: regex }];
        }

        if (queryParams.startDate || queryParams.endDate) {
            query.date = {};
            if (queryParams.startDate) query.date.$gte = new Date(queryParams.startDate);
            if (queryParams.endDate) query.date.$lte = new Date(queryParams.endDate);
        }

        const messages = await db.collection("messages").find(query).sort({ date: -1 }).toArray();

        messages.forEach(msg => {
            if (Array.isArray(msg.replyList)) {
                msg.replyList.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        });

        return messages.map(m => new Message(m));
    }

}



module.exports = Message;