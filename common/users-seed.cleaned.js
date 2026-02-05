const { ObjectId } = require("mongodb");

module.exports = [
  {
    "_id": new ObjectId("682faffb43cca01635e27a78"),
    "prenom": "Alice",
    "nom": "Dupont",
    "login": "alice",
    "password": "$2b$10$DtY14JYktYnoOourOTUAiOMMm.QwubjPFzUYHphPPam/jCQ5/O4ae",
    "email": "alice@mail.com",
    "isValidated": true,
    "role": "member",
    "description": "Passionnée de cuisine et de forums communautaires."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a79"),
    "prenom": "Bob",
    "nom": "Martin",
    "login": "bob",
    "password": "$2b$10$yQ6jzxayS43yzCYoy/JEM.T9NfXWOc8okgNI6y7RGwv2FmahSkG6y",
    "email": "bob@mail.com",
    "isValidated": true,
    "role": "member",
    "description": "Toujours prêt à aider sur le forum !"
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7a"),
    "prenom": "Emma",
    "nom": "Lemoine",
    "login": "emma",
    "password": "$2b$10$gbHSQxFHt6BHylyKMcrkRuwMpfLkwbCfwHuH6BBzQhmsYaFAwtfqC",
    "email": "emma@mail.com",
    "isValidated": true,
    "role": "member",
    "description": "Étudiante passionnée par les recettes simples."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7b"),
    "prenom": "Luc",
    "nom": "Girard",
    "login": "luc",
    "password": "$2b$10$pCHOBitHGYTCzjUtdU0f8..ZB2/d4dAcE5/SyRMufuoR7ow74ziDW",
    "email": "luc@mail.com",
    "isValidated": true,
    "role": "member",
    "description": "Fan de gratins et de fromage."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7c"),
    "prenom": "Julia",
    "nom": "Moreau",
    "login": "julia",
    "password": "$2b$10$2DoLwQqL6dzeWhxKWmChLO6P8Tj4Ah2coIfDhvs4tKt5NlK1r5Bdu",
    "email": "julia@mail.com",
    "isValidated": true,
    "role": "member",
    "description": "Nouvelle membre du forum, curieuse de tout !"
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7d"),
    "prenom": "Admin",
    "nom": "One",
    "login": "admin1",
    "password": "$2b$10$tSXfhNbBbGJiUZi57RWgm.4z5jcITDDAtSP3oxvxSC.rluurVnyai",
    "email": "admin1@mail.com",
    "isValidated": true,
    "role": "admin",
    "description": "Administrateur général du forum privé."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7e"),
    "prenom": "Admin",
    "nom": "Deux",
    "login": "admin2",
    "password": "$2b$10$zITaxM.P2diLOobGQHzaqOCQljvA.oW14.fuH76MGh/Rs8u7ytnEi",
    "email": "admin2@mail.com",
    "isValidated": true,
    "role": "admin",
    "description": "Responsable technique du forum."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a7f"),
    "prenom": "Admin",
    "nom": "Trois",
    "login": "admin3",
    "password": "$2b$10$8GtY8deGlRGU2e43w0wvVe8qCDTwqvvAO3BW6soFOwEpcyNQ9ykpi",
    "email": "admin3@mail.com",
    "isValidated": true,
    "role": "admin",
    "description": "Modérateur des discussions privées."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a80"),
    "prenom": "Admin",
    "nom": "Quatre",
    "login": "admin4",
    "password": "$2b$10$36n9B0.twhv.OVrD9A28M.ZD2eJTjvZWahsSrAvXTcUQ5rL1HQPQi",
    "email": "admin4@mail.com",
    "isValidated": true,
    "role": "admin",
    "description": "Surveille les alertes et les contenus sensibles."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a81"),
    "prenom": "Chloe",
    "nom": "Blanc",
    "login": "chloe",
    "password": "$2b$10$gf2Vh3GmnWE2KMl2sfzbaO.Vcn6sRKNQuJ6KkoKsZUB50XKavXXCe",
    "email": "chloe@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "J'aimerais rejoindre la communauté !"
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a82"),
    "prenom": "David",
    "nom": "Roux",
    "login": "david",
    "password": "$2b$10$SMG.TxEf4aOupzeAOBya/emHeWjToH3RtiTvjtpHGvLRW3beXeJUq",
    "email": "david@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Développeur curieux de forums culinaires."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a83"),
    "prenom": "Nina",
    "nom": "Leroy",
    "login": "nina",
    "password": "$2b$10$tJIJSh7j.kQM5PWrzi05kOOgnsuLbXvobHwZBJd1J8DWmlzNGw4n6",
    "email": "nina@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Grande fan de desserts et d'échanges gourmands."
  },
  {
    "_id": new ObjectId("682faffb43cca01635e27a84"),
    "prenom": "Thomas",
    "nom": "Bertrand",
    "login": "thomas",
    "password": "$2b$10$yHvNwSqQbLXvw2ZPGWdC2.FH.D.gaJsxJ6bxmv4pAUIAwzk5PfeNC",
    "email": "thomas@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Envie de partager mes recettes familiales."
  }
];
