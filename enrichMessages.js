const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI = "mongodb+srv://saracas04:25-Mayo04@sorbonnebd.nyi2k.mongodb.net/forum";
const client = new MongoClient(MONGO_URI);

async function enrichMessagesWithLogins() {
    try {
        await client.connect();
        const db = client.db("forum");
        const messages = await db.collection("messages").find({}).toArray();

        for (const msg of messages) {
                
            // Obtenir login de l'autheur du message
            const author = await db.collection("users").findOne({ _id: msg.user });
            const userLogin = author?.login || "inconnu";

            // Enricher les replies avec le login
            const enrichedReplies = await Promise.all(
                (msg.replyList || []).map(async (reply) => {
                const replyAuthor = await db.collection("users").findOne({ _id: reply.user });
                return {
                    ...reply,
                    userLogin: replyAuthor?.login || "inconnu"
                };
                })
            );

            // Update message
            await db.collection("messages").updateOne(
                { _id: msg._id },
                {
                $set: {
                    userLogin: userLogin,
                    replyList: enrichedReplies
                }
                }
            );

            console.log(`- Message ${msg._id} enriched.`);
        }

        console.log("- ALL MESSAGES UPDATED.");
    } catch (err) {
        console.error(" - ERROR ENRICHING MESSAGES : ", err);
    } finally {
        await client.close();
    }
}

enrichMessagesWithLogins();
