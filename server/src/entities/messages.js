const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

class Message {
    constructor({ _id, title, content, user, userLogin, date = new Date(), isPrivate = false, replyList = [] }) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.date = new Date(date);
        this.user = new ObjectId(user);
        this.userLogin = userLogin;
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
        userLogin: this.userLogin,
        isPrivate: this.isPrivate,
        replyList: this.replyList
        });

        const inserted = await db.collection("messages").findOne({ _id: result.insertedId });
        return new Message(inserted);
    }

    static async findAllByPrivacy(isPrivate) {
        const db = getDB();
        const messages = await db.collection("messages")
        .find({ isPrivate })
        .sort({ date: -1 })
        .toArray();

        messages.forEach(msg => {
        if (Array.isArray(msg.replyList)) {
            msg.replyList.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        });

        return messages.map(m => new Message(m));
    }

    static async findWithFilters(queryParams, isPrivate) {
        const db = getDB();
        const matchStage = { isPrivate };

        // 💡 Soporte tanto para ID como login
        if (queryParams.user) {
            matchStage.user = new ObjectId(queryParams.user);
        } else if (queryParams.userLogin) {
            const user = await db.collection("users").findOne({ login: queryParams.userLogin });
            if (!user) return []; // no hay coincidencias
            matchStage.user = user._id;
        }

        if (queryParams.keyword) {
            const regex = new RegExp(queryParams.keyword, "i");
            matchStage.$or = [{ title: regex }, { content: regex }];
        }

        if (queryParams.startDate || queryParams.endDate) {
            matchStage.date = {};
            if (queryParams.startDate) matchStage.date.$gte = new Date(queryParams.startDate);
            if (queryParams.endDate) matchStage.date.$lte = new Date(queryParams.endDate);
        }

        const messages = await db.collection("messages").find(matchStage).sort({ date: -1 }).toArray();

        messages.forEach(m => {
            if (Array.isArray(m.replyList)) {
                m.replyList.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        });

        return messages.map(m => new Message(m));
    }


    static async findAllOfUser(userId) {
        const db = getDB();
        const messages = await db.collection("messages")
        .find({ user: new ObjectId(userId) })
        .sort({ date: -1 })
        .toArray();

        messages.forEach(msg => {
        if (Array.isArray(msg.replyList)) {
            msg.replyList.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        });

        return messages.map(m => new Message(m));
    }

    static async addReply(messageId, content, userId, userLogin) {
        const db = getDB();
        const reply = {
        _id: new ObjectId(),
        content,
        date: new Date(),
        user: new ObjectId(userId),
        userLogin: userLogin
        };

        const result = await db.collection("messages").updateOne(
        { _id: new ObjectId(messageId) },
        { $push: { replyList: reply } }
        );

        return result.modifiedCount > 0 ? reply : null;
    }

    static async findRepliesByUser(userId) {
        const db = getDB();
        const messages = await db.collection("messages").find({
        "replyList.user": new ObjectId(userId)
        }).toArray();

        const replies = [];

        for (const msg of messages) {
        const matching = msg.replyList?.filter(r => r.user.toString() === userId.toString()) || [];

        matching.forEach(r => {
            replies.push({
            ...r,
            messageId: msg._id,
            messageTitle: msg.title
            });
        });
        }

        return replies;
    }

    static async deleteReplyById(messageId, replyId) {
        const db = getDB();
        return await db.collection("messages").updateOne(
        { _id: new ObjectId(messageId) },
        { $pull: { replyList: { _id: new ObjectId(replyId) } } }
        );
    }

    static async deleteById(id) {
        const db = getDB();
        return await db.collection("messages").deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = Message;
