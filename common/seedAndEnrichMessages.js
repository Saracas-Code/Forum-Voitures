const { MongoClient, ObjectId } = require("mongodb");
const users = require("./users-seed.cleaned.js");
const messages = require("./messages-seed.cleaned.js");

MONGO_URI_LOCAL = "mongodb://127.0.0.1:27017/forum"

const clientLocal = new MongoClient(MONGO_URI_LOCAL);

async function seedAndEnrichMessages() {
    try {
        await clientLocal.connect();
        const db = clientLocal.db("forum");

        // Nettoyer les collections existantes
        await db.collection("users").deleteMany({});
        await db.collection("messages").deleteMany({});

        // Insérer les nouvelles données
        await db.collection("users").insertMany(users);
        await db.collection("messages").insertMany(messages);

        console.log("- Données insérées avec succès.");

        // Enrichir les messages avec les logins
        const tousLesMessages = await db.collection("messages").find({}).toArray();

        for (const msg of tousLesMessages) {
            const auteur = await db.collection("users").findOne({ _id: msg.user });
            const loginAuteur = auteur?.login || "inconnu";

            const reponsesEnrichies = await Promise.all(
                (msg.replyList || []).map(async (reply) => {
                    const auteurReponse = await db.collection("users").findOne({ _id: reply.user });
                    return {
                        ...reply,
                        userLogin: auteurReponse?.login || "inconnu"
                    };
                })
            );

            await db.collection("messages").updateOne(
                { _id: msg._id },
                {
                    $set: {
                        userLogin: loginAuteur,
                        replyList: reponsesEnrichies
                    }
                }
            );

            console.log(`- Message ${msg._id} enrichi.`);
        }

        console.log("- TOUS LES MESSAGES ONT ÉTÉ ENRICHIS.");
    } catch (err) {
        console.error("❌ ERREUR : ", err);
    } finally {
        await clientLocal.close();
    }
}

seedAndEnrichMessages();
