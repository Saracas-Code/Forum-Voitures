const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

class Message {
    constructor({ title, content, date = new Date(), user, isPrivate = false, replyList = [] }) {
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
        return result;
    }

    static async findAllByPrivacy(isPrivate) {
        const db = getDB();
        const messages = await db.collection("messages")
            .find({ isPrivate })
            .toArray();
        return messages.map(msg => new Message(msg));
    }

    static async addReply(messageId, replyContent, replyUser) {
        const db = getDB();
        const reply = {
            content: replyContent,
            date: new Date(),
            user: replyUser
        };

        const result = await db.collection("messages").updateOne(
            { $push: { replyList: reply } }
        );

        return result.modifiedCount > 0 ? reply : null;
    }
}



module.exports = Message;