const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/forum";

const client = new MongoClient(MONGO_URI);
let db;

// Pour se connecter a la base
async function connectToDB() {
    await client.connect();
    db = client.db();
    console.log(`[DB] MONGO_URL: ${MONGO_URI}`);
    console.log(`[DB] Connected. Database: ${db.databaseName}`);
    try {
        const collections = await db.listCollections().toArray();
        const names = collections.map((c) => c.name).join(", ");
        console.log(`[DB] Collections: ${names || "(none)"}`);
    } catch (err) {
        console.warn("[DB] Unable to list collections:", err?.message || err);
    }
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
