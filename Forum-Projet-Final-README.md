
# Forum - Projet Final

Ce projet est une application web de type forum développée dans le cadre du cours **Technologie du Web**.

## 📁 Structure du projet

```
Forum-Projet-Final/
├── client/         # Frontend (React + Vite)
├── server/         # Backend (Node.js + Express)
├── common/         # Code partagé entre client et serveur (si nécessaire)
└── .gitignore
```

---

## 🚀 Installation et exécution

### 1. Cloner le dépôt

```bash
git clone <URL-du-depot>
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

Assurez-vous que **axios** est installé, sinon exécutez cette commande pour l'ajouter :

```bash
npm install axios
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

Installez les packages manquants si nécessaire avec cette commande :

```bash
npm install express cors mongodb
```

---

### 3. Lancer le projet

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

➡️ Le backend sera disponible sur `http://localhost:8000`.

---

## 🔐 Variables d’environnement

Si vous utilisez des fichiers `.env`, créez vos propres fichiers `.env` dans les dossiers `client/` et `server/` avec vos variables nécessaires, notamment pour MongoDB (comme la `MONGO_URI`).

---

## ℹ️ Remarques

- Assurez-vous d’avoir **Node.js**, **npm**, et **MongoDB** installés.
- Les dossiers `node_modules` et `dist/` sont ignorés grâce au `.gitignore`.
- Le code commun peut être placé dans le dossier `common/`.

