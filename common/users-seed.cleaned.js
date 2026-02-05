const { ObjectId } = require("mongodb");

module.exports = [
  {
    "_id": new ObjectId("682faffb43cca01635e27a78"),
    "prenom": "Alice",
    "nom": "Dupont",
    "login": "alice",
    "password": "$2b$10$50.XmRD1VRXnCd0P04a9N.qVs1jGfCLXyjKuT6hQn4scLZFOLVTO.",
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
    "password": "$2b$10$jXHfMc64oqPl5JUpaqmKIey0BaUEyofn.ALgJusACwzrESBprfmnK",
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
    "password": "$2b$10$wRvCurxokqhphjD9gG/9yu1D2na8lgMTZ5A88cqPKt.PgHxWIowou",
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
    "password": "$2b$10$RTZzKSClbWwaoXN92tmTR.9XUWP20IYTM1.NfBd3DFa9QwupUGcgG",
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
    "password": "$2b$10$u/47AaEBXpqKg4q.AeZSou0Q04dWtabDlhn.CGYBxvsPBlA7.q8q2",
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
    "password": "$2b$10$IbahuxDX4xqmU89oIlDuIu9RArdWHfW7/1qZRRvJAxcSNsxkfMDja",
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
    "password": "$2b$10$7XYaJZE1BO8AXBklTWCIYOPFX4ycJHLMjOVKe4atbotZux2rdx8de",
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
    "password": "$2b$10$WTF97uK2dy2/tBD.t4EJhubosUC2PbBtrm3FKoB5OcOy5dWTsjH4a",
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
    "password": "$2b$10$IYW679ONxRcKuoe0WC/Lg.mn6A2NuNdwOeGdJO2362zgncAc.3vO6",
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
    "password": "$2b$10$xO2vu0qKcw3Ff1VRObCocOixoYHYVsWJgCisawIp2o/a78Sgg1rzm",
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
    "password": "$2b$10$glTkJwAKBQUXbK3ID5NkeuRuBAvvRnZOwW6vqLTM5rQmyRA91x0l.",
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
    "password": "$2b$10$HlqEGtKEaAQo3Q/RgvZG0eLl5mUEpijkGtprXsvb9FxUmvyOZZNLK",
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
    "password": "$2b$10$HCslJTBV2P3i8UwHDaJoy.XtRghUFD7xAevwWm.xRaNUjJNsJhJO.",
    "email": "thomas@mail.com",
    "isValidated": false,
    "role": "pending",
    "description": "Envie de partager mes recettes familiales."
  }
];
