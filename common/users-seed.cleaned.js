const { ObjectId } = require("mongodb");

module.exports = [
  {
    "_id": new ObjectId("682faffb43cca01635e27a78"),
    "prenom": "Alice",
    "nom": "Dupont",
    "login": "alice",
    "password": "$2b$10$ZnxGJcvFE0CcMTs0O.wAoOEJpNZPWYH9ZxjUfwoij35.MGvJaLHMC",
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
    "password": "$2b$10$xjw9qwoKS4w9qgSFqVohSuwEML16WexZwHHQq2Id8bXHFN9U7cJ4O",
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
    "password": "$2b$10$X2RBnIRwrVruvB2NPNrpiOiyfr0JKgIhWgO1paO9FfaGv8707NrrW",
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
    "password": "$2b$10$TzWmD32Koiq.WZkF70s/jONwJ4L.oDdMwMfvTJmpDWKc9O0foMWF6",
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
    "password": "$2b$10$HG63534tDMZycNQ1OxnQbOfsJ/of5QMx371xPNuAmEaVNoV05EfBy",
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
    "password": "$2b$10$erZjlYUZT6Se9tNAT9VDzODd2hwXhW760vd.PtxpsfB8InsLt5N/6",
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
    "password": "$2b$10$3Yx8FAYZtEs1Qm9H/ADU6eBQ9kVaCRO1f5mdCakEVHoH0F60ClNia",
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
    "password": "$2b$10$4NYKE9Gh.2SwQ/8uVuusxuUNa8xUg7u/YYt5x76QGUgWoStMZW6Oy",
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
    "password": "$2b$10$gJpUJS9G.qN/5CoUFQdmAeKaacDTj0Y8hwcQB1GQ7AAw.cOE7xOZ2",
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
    "password": "$2b$10$cqbOzBHcDizZura9v7OdL.fK4wU0L62Wqr09jA10CCRcaFnGsFWVm",
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
    "password": "$2b$10$.6Dj/O566oAEjtfYQTKZ.Ocn2t387SLuD2aB6lm2dEIjNGPnICY6C",
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
    "password": "$2b$10$/7iBIyijTnWWvDs4ANN04O8LVRP09CZjg6rTaGcGom7p5BCkN9VYa",
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
    "password": "$2b$10$N9vEkqOZPK32uF.0xhMaGe79py0ER4EQ.7KDcqvj1yVkgvm1kqZ/K",
    "email": "thomas@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Envie de partager mes recettes familiales."
  }
];
