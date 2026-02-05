
# Forum - Projet Final

Ce projet est une application web de type forum développée dans le cadre du cours **Technologie du Web**.

## Structure du projet

```
Forum-Projet-Final/
├── client/         # Frontend (React + Vite)
├── server/         # Backend (Node.js + Express)
├── common/         # Code partagé entre client et serveur 
└── .gitignore
```

---

## Note sur la sécurité des données

Ce projet a été réalisé ayant suivi la matière **Introduction à la cryptologie** à la Sorbonne. Une des leçons essentielles que nous en avons tirée est l'importance de protéger les données sensibles.

C’est pourquoi, même dans un projet pédagogique, nous avons intégré un **chiffrement sécurisé** des mots de passe dans la base de données. Grâce à la bibliothèque `bcrypt`, chaque mot de passe est automatiquement haché avant d’être stocké, garantissant ainsi qu’aucune donnée confidentielle ne soit enregistrée en clair.

Ce choix s’inscrit dans une démarche de bonnes pratiques en matière de développement web sécurisé.

## Installation et exécution

### 1. Cloner le dépôt

```bash
git clone https://github.com/Saracas-Code/Forum-Voitures.git
cd Forum-Projet-Final
```

### 2. Installer les dépendances

#### Client (frontend)

Dans le dossier `client/`, assurez-vous d'avoir **Node.js** et **npm** installés. Ensuite, installez les dépendances nécessaires :

```bash
cd client
npm install
```

**Packages nécessaires :**
- **axios** (pour faire les requêtes au serveur)
- **vite** (pour le démarrage du projet React)
- **react-icons** (pour voir quelques icons graphiques du projet)

Assurez-vous que **axios** et **react-icons** sont installés, sinon exécutez cettes commandes pour les ajouter :

```bash
npm install axios react-icons
```

#### Serveur (backend)

Dans le dossier `server/`, installez les dépendances nécessaires pour le serveur Node.js avec **Express** et **CORS** :

```bash
cd ../server
npm install
```

**Packages nécessaires :**
- **express** (pour créer l'API)
- **cors** (pour gérer les autorisations de cross-origin)
- **mongodb** (pour se connecter à la base de données MongoDB)
- **bcrypt** (pour chiffrer les mots de passe dans la BBDD)

Installez les packages manquants si nécessaire avec cette commande :

```bash
npm install express cors mongodb bcrypt
```

#### Common

Dans le dossier `common/`, installez les dépendances suivantes nécessaires à l'exécution des scripts :

```bash
npm install mongodb bcrypt
```

---

### 3. Préparation de la base de données

Pour alimenter la base de données avec des données de test, nous avons utilisé un script de nettoyage (`cleanSeedFile.js`) qui convertit des fichiers .js contenant des identifiants au format non compatible (comme { "`$oid`": "..." }) en une version exploitable pour Node.js, en les remplaçant par `new ObjectId("...")`. Ce processus produit des fichiers nettoyés, tels que `users-seed.cleaned.js`.

Ensuite, nous utilisons le script **`seedAndEnrichMessages.js`** qui :

1. **Insère les données nettoyées** dans la base MongoDB ;
2. **Enrichit les messages** en y ajoutant un champ `userLogin` (le nom d'utilisateur), aussi bien pour l’auteur principal que pour les auteurs des réponses dans le champ `replyList`.

**> Pourquoi cette agrégation ?**
Par défaut, les messages ne contiennent que l’identifiant (`_id`) de leur auteur. Grâce à cette agrégation, on peut directement accéder au login de chaque utilisateur dans les messages et réponses. Cela facilite grandement l’affichage dans le frontend sans avoir à faire de requêtes supplémentaires. De plus, il nous semblait didactique d’intégrer une opération de base de données plus avancée, afin de mieux comprendre le fonctionnement des jointures manuelles et de la mise à jour de documents dans MongoDB.

**> Exécution des scripts** :

1. Nettoyer les fichiers exportés :

```bash
node cleanSeedFile.js users-seed.js
node cleanSeedFile.js messages-seed.js
```

2. Charger et enrichir les données :

```bash
node seedAndEnrichMessages.js
```

> 📁 Tous ces scripts sont placés dans le dossier `common/`, car ils concernent à la fois le backend (accès et mise en forme des données) et le frontend (affichage enrichi des messages).


### 4. Lancer le projet

#### Client (React + Vite)

Dans le dossier `client/`, lancez le projet frontend avec la commande suivante :

```bash
cd client
npm run dev
```

➡️ L'application frontend sera disponible sur `http://localhost:5173`.

#### Serveur (API Express)

Dans le dossier `server/`, lancez le serveur backend avec la commande suivante :

```bash
cd ../server
npm run dev
```

➡️ Le backend sera disponible sur `http://localhost:3000`.

---

## Conseils de utilisation

Pour tester rapidement les différentes fonctionnalités du forum, vous pouvez utiliser les identifiants suivants :

- Compte administrateur :

**Login** : admin1

**Mot de passe** : admin123

➕ Permet d’accéder à toutes les fonctionnalités d’administration (modération, validation d’utilisateurs, etc.)

- Compte membre :

**Login** : alice

**Mot de passe** : alice123

➕ Permet de publier, répondre et interagir dans les forums publics.

> N’hésitez pas à enrichir les jeux de données ou à tester la sécurité avec d'autres comptes simulés.

## Docker (demo)
docker compose up --build
Client: http://localhost:8080
Server: http://localhost:3000
Mongo: mongodb://localhost:27017/forum
Seed: docker compose run --rm seed
