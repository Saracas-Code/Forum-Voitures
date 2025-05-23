const { MongoClient } = require("mongodb");

MONGO_URI_LOCAL = "mongodb://127.0.0.1:27017/forum"
//MONGO_URI = "mongodb+srv://saracas04:25-Mayo04@sorbonnebd.nyi2k.mongodb.net/forum"

const clientLocal = new MongoClient(MONGO_URI_LOCAL);
//const client = new MongoClient(MONGO_URI);

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
