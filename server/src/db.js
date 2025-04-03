const { MongoClient } = require("mongodb");

MONGO_URI = "mongodb+srv://saracas04:25-Mayo04@sorbonnebd.nyi2k.mongodb.net/forum"

const client = new MongoClient(MONGO_URI);
let db;

// Pour se connecter à la base
async function connectToDB() {
    await client.connect();
    db = client.db("forum"); 
    console.log("Connexion à MongoDB réussie");
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
