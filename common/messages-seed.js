module.exports = [{
  "_id": {
    "$oid": "682fb00543cca01635e27a85"
  },
  "title": "Bienvenue à tous",
  "content": "N'hésitez pas à poser vos questions ici.",
  "user": {
    "$oid": "682faffb43cca01635e27a78"
  },
  "date": {
    "$date": "2025-05-01T10:00:00.000Z"
  },
  "isPrivate": false,
  "replyList": [
    {
      "_id": {
        "$oid": "66520f00123456789abc0001"
      },
      "content": "Merci Alice !",
      "user": {
        "$oid": "682faffb43cca01635e27a79"
      },
      "date": {
        "$date": "2025-05-01T11:00:00.000Z"
      }
    },
    {
      "_id": {
        "$oid": "66520f00123456789abc0005"
      },
      "content": "Hâte de participer :)",
      "user": {
        "$oid": "682faffb43cca01635e27a7a"
      },
      "date": {
        "$date": "2025-05-01T11:30:00.000Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "682fb00543cca01635e27a86"
  },
  "title": "Réunion admin",
  "content": "Réunion prévue demain à 14h en salle 2.",
  "user": {
    "$oid": "682faffb43cca01635e27a7d"
  },
  "date": {
    "$date": "2025-05-02T09:00:00.000Z"
  },
  "isPrivate": true,
  "replyList": [
    {
      "_id": {
        "$oid": "66520f00123456789abc0002"
      },
      "content": "Je serai là.",
      "user": {
        "$oid": "682faffb43cca01635e27a7e"
      },
      "date": {
        "$date": "2025-05-02T10:00:00.000Z"
      }
    },
    {
      "_id": {
        "$oid": "66520f00123456789abc0006"
      },
      "content": "Je prévois le support technique.",
      "user": "admin4",
      "date": {
        "$date": "2025-05-02T10:30:00.000Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "682fb00543cca01635e27a87"
  },
  "title": "Recettes faciles",
  "content": "Partagez vos recettes simples pour les étudiants.",
  "user": {
    "$oid": "682faffb43cca01635e27a7a"
  },
  "date": {
    "$date": "2025-05-04T14:00:00.000Z"
  },
  "isPrivate": false,
  "replyList": [
    {
      "_id": {
        "$oid": "66520f00123456789abc0003"
      },
      "content": "Gratin de pommes de terre avec fromage !",
      "user": {
        "$oid": "682faffb43cca01635e27a7b"
      },
      "date": {
        "$date": "2025-05-04T15:00:00.000Z"
      }
    },
    {
      "_id": {
        "$oid": "66520f00123456789abc0007"
      },
      "content": "Pâtes au pesto, rapide et efficace !",
      "user": {
        "$oid": "682faffb43cca01635e27a79"
      },
      "date": {
        "$date": "2025-05-04T15:20:00.000Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "682fb00543cca01635e27a88"
  },
  "title": "Problèmes de connexion",
  "content": "Quelqu’un d’autre a des soucis avec la plateforme ?",
  "user": {
    "$oid": "682faffb43cca01635e27a7c"
  },
  "date": {
    "$date": "2025-05-05T08:30:00.000Z"
  },
  "isPrivate": false,
  "replyList": [
    {
      "_id": {
        "$oid": "66520f00123456789abc0008"
      },
      "content": "Non, tout fonctionne ici !",
      "user": {
        "$oid": "682faffb43cca01635e27a78"
      },
      "date": {
        "$date": "2025-05-05T09:00:00.000Z"
      }
    }
  ]
},
{
  "_id": {
    "$oid": "682fb00543cca01635e27a89"
  },
  "title": "Modération forum privé",
  "content": "Ajoutez vos suggestions pour améliorer la modération.",
  "user": {
    "$oid": "682faffb43cca01635e27a7f"
  },
  "date": {
    "$date": "2025-05-03T08:45:00.000Z"
  },
  "isPrivate": true,
  "replyList": [
    {
      "_id": {
        "$oid": "66520f00123456789abc0004"
      },
      "content": "Activer l’alerte pour les mots interdits, bonne idée !",
      "user": {
        "$oid": "682faffb43cca01635e27a80"
      },
      "date": {
        "$date": "2025-05-03T09:00:00.000Z"
      }
    }
  ]
},
{
  _id: { "$oid": "682fb00543cca01635e27a8a" },
  title: "Bons plans étudiants",
  content: "Connaissez-vous des réductions intéressantes pour les étudiants à Paris ?",
  user: { "$oid": "682faffb43cca01635e27a7a" },
  date: { "$date": "2025-05-06T12:00:00.000Z" },
  isPrivate: false,
  replyList: [
    {
      _id: { "$oid": "66520f00123456789abc0009" },
      content: "La carte Imagine R est super avantageuse pour les transports !",
      user: { "$oid": "682faffb43cca01635e27a7b" },
      date: { "$date": "2025-05-06T12:30:00.000Z" }
    },
    {
      _id: { "$oid": "66520f00123456789abc0010" },
      content: "Certains cinémas proposent des tarifs étudiants à 5€.",
      user: { "$oid": "682faffb43cca01635e27a79" }, 
      date: { "$date": "2025-05-06T13:00:00.000Z" }
    }
  ]
},
{
  _id: { "$oid": "682fb00543cca01635e27a8b" },
  title: "Suggestion d’outil collaboratif",
  content: "Que pensez-vous de l’utilisation de Notion pour nos projets ?",
  user: { "$oid": "682faffb43cca01635e27a7d" }, 
  date: { "$date": "2025-05-06T14:15:00.000Z" },
  isPrivate: false,
  replyList: [
    {
      _id: { "$oid": "66520f00123456789abc0011" },
      content: "J’adore Notion, très flexible pour organiser nos tâches.",
      user: { "$oid": "682faffb43cca01635e27a7e" },
      date: { "$date": "2025-05-06T14:45:00.000Z" }
    }
  ]
},
{
  _id: { "$oid": "682fb00543cca01635e27a8c" },
  title: "Projet terminé !",
  content: "On a réussi à finaliser notre forum Forocohe pour le cours de Techno Web. Bravo à toutes et tous !",
  user: { "$oid": "682faffb43cca01635e27a7f" }, 
  date: { "$date": "2025-05-07T16:00:00.000Z" },
  isPrivate: true,
  replyList: [
    {
      _id: { "$oid": "66520f00123456789abc0012" },
      content: "Félicitations à tout le monde, c’était intense mais enrichissant !",
      user: { "$oid": "682faffb43cca01635e27a78" },
      date: { "$date": "2025-05-07T16:30:00.000Z" }
    },
    {
      _id: { "$oid": "66520f00123456789abc0013" },
      content: "On mérite des grandes vacances...",
      user: { "$oid": "682faffb43cca01635e27a7a" },
      date: { "$date": "2025-05-07T17:00:00.000Z" }
    }
  ]
},
{
  _id: { "$oid": "682fb00543cca01635e27a8d" },
  title: "Petit bonus sécurité",
  content: "Au fait, vous saviez que nos mots de passe sont chiffrés dans la base de données ? Plutôt classe, non ?",
  user: { "$oid": "682faffb43cca01635e27a79" },
  date: { "$date": "2025-05-07T18:00:00.000Z" },
  isPrivate: true,
  replyList: [
    {
      _id: { "$oid": "66520f00123456789abc0014" },
      content: "Ah ouais ? On a géré jusqu’au bout !",
      user: { "$oid": "682faffb43cca01635e27a7d" }, 
      date: { "$date": "2025-05-07T18:15:00.000Z" }
    }
  ]
}

]