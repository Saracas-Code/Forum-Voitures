const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/forum";
const client = new MongoClient(MONGO_URI);

async function run() {
    try {
        await client.connect();
        const db = client.db();

        console.log(`[CHECK] MONGO_URL: ${MONGO_URI}`);
        console.log(`[CHECK] DB: ${db.databaseName}`);

        const count = await db.collection("users").countDocuments();
        console.log(`[CHECK] users count: ${count}`);

        const admin = await db.collection("users").findOne({ login: "admin1" });
        console.log(`[CHECK] admin1: ${admin ? "FOUND" : "NOT FOUND"}`);
        if (admin) {
            console.log(`[CHECK] admin1 _id: ${admin._id}, isValidated: ${admin.isValidated}, role: ${admin.role}`);
        }
    } catch (err) {
        console.error("[CHECK] error:", err);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
}

run();
