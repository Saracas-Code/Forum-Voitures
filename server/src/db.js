const { MongoClient } = require("mongodb");

MONGO_URI_LOCAL = "mongodb://127.0.0.1:27017/forum"

const clientLocal = new MongoClient(MONGO_URI_LOCAL);
let db;

// Pour se connecter à la base
async function connectToDB() {
    await clientLocal.connect();
    db = clientLocal.db("forum"); 
    console.log("Connexion à MongoDB réussie");
}

function getDB() {
    return db;
}

module.exports = { connectToDB, getDB };
