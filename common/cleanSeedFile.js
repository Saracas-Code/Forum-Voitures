const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// Nombre de tours de salage pour le hachage
const SALT_ROUNDS = 10;

async function cleanOidsHashPasswordsAndDates(cheminFichier) {
    const original = require(cheminFichier); // Charge le fichier comme module JS
    const nettoyés = [];

    for (const entrée of original) {
        const nouvelleEntrée = JSON.parse(JSON.stringify(entrée)); // Copie profonde

        // Remplacer { "$oid": ... } par un marqueur temporaire
        function remplacerOids(obj) {
            for (const clé in obj) {
                if (obj[clé] && typeof obj[clé] === "object") {
                    if (obj[clé].$oid) {
                        obj[clé] = `__OID__${obj[clé].$oid}__`;
                    } else {
                        remplacerOids(obj[clé]);
                    }
                }
            }
        }

        // Remplacer { "$date": ... } par un marqueur temporaire
        function remplacerDates(obj) {
            for (const clé in obj) {
                if (obj[clé] && typeof obj[clé] === "object") {
                    if (obj[clé].$date) {
                        obj[clé] = `__DATE__${obj[clé].$date}__`;
                    } else {
                        remplacerDates(obj[clé]);
                    }
                }
            }
        }

        remplacerOids(nouvelleEntrée);
        remplacerDates(nouvelleEntrée);

        // Hacher le mot de passe s'il existe
        if (nouvelleEntrée.password) {
            nouvelleEntrée.password = await bcrypt.hash(nouvelleEntrée.password, SALT_ROUNDS);
        }

        nettoyés.push(nouvelleEntrée);
    }

    // Convertir en texte JS et restaurer les ObjectId et Dates
    let sortie = JSON.stringify(nettoyés, null, 2)
        .replace(/"__OID__([a-f0-9]{24})__"/g, 'new ObjectId("$1")')
        .replace(/"__DATE__(.*?)__"/g, 'new Date("$1")');

    sortie = 'const { ObjectId } = require("mongodb");\n\n' +
             'module.exports = ' + sortie + ';\n';

    const cheminNettoyé = cheminFichier.replace(/\.js$/, ".cleaned.js");
    fs.writeFileSync(cheminNettoyé, sortie);
    console.log(`✅ Fichier nettoyé, daté et chiffré généré : ${cheminNettoyé}`);
}

// POINT D'ENTRÉE
if (process.argv.length < 3) {
    console.log("ℹ️ Utilisation : node cleanSeedFile.js nomDuFichier.js");
    process.exit(1);
}

const inputFile = path.resolve(process.argv[2]);
cleanOidsHashPasswordsAndDates(inputFile);
