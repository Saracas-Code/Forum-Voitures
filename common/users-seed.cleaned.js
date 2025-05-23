const { ObjectId } = require("mongodb");

module.exports = [
  {
    "_id": new ObjectId("682faffb43cca01635e27a78"),
    "prenom": "Alice",
    "nom": "Dupont",
    "login": "alice",
    "password": "$2b$10$wIxh9JRuBs9GAEgBIFxAtuUm9zfi2xlhWp9RIoO23qWC3m9TjDxAy",
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
    "password": "$2b$10$N8eaKqw8rtIw1bhoQ1I9eeE4ZbIf7ZFYuWy156e4JcCd/IAJIeF5u",
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
    "password": "$2b$10$IRxzuK.VpBRK3w0cVgGQTO9mmMWnAFwLaEtxyftIHJP2NSZ.7heRy",
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
    "password": "$2b$10$cpAAAQpB227/3TkNCFYj6eV8dRVKlc3aGQ05H6ejZiq0m3CK8PEAC",
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
    "password": "$2b$10$s.TGJ7OS/MRqF2j6WAC8desnck6SmC0qizogYlgos.gCwkQXXvW9K",
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
    "password": "$2b$10$ciqRSBBdCu/pa/6hCj8x..oLtKfJMpgFPUONF74PpeVz.aJyaVM5i",
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
    "password": "$2b$10$35uDCYfwNvJk868iCToHSuv1X/m9lDfAGI9s9yLxgIf2se9tjf5Jq",
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
    "password": "$2b$10$a.OyoqxI.1HR.lrtwiUWbeSCw/SOtBqMJKlcDbEn28OmqXKJJsj7S",
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
    "password": "$2b$10$l34qsGikUluDRCArqt/jX.m7klJ5CLmVVKwHS0N3vgRU6Pta4fYTO",
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
    "password": "$2b$10$O/brD63IafgTic5cb0OrUOrgjazPjl2whShTEqR0VYeVzLee7Rqhq",
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
    "password": "$2b$10$W1RqYbCtF/IiJuXgxVNMSO9ScfomjJv0bLDR1xYuRMndTyo02wYf6",
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
    "password": "$2b$10$7ZsV8VcV4xA9ISWn9UtBx.hgc20aUygT8x/n/pvjnC49jVUcHW5hK",
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
    "password": "$2b$10$rsdqueUyT2QInuZSI8HrGuBioDvKhNKShvFRDO.pyL3XWESGPq/D2",
    "email": "thomas@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Envie de partager mes recettes familiales."
  }
];
