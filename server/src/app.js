const express = require("express");
const cors = require("cors");
const session = require("express-session");
const apiRoutes = require("./api");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // le frontend (ou true pour tester avec Postman)
    credentials: true                // permet d'envoyer et recevoir des cookies (express-session)
}));

app.use(express.json());

app.use(session({
    secret: "contraseñacookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,      // false : localhost. true si on utilise https
        httpOnly: true,
        sameSite: "lax",       // permite cookies entre localhost:<puerto>
        maxAge: 1000 * 60 * 60 * 2  // 2h
    }
}));

app.use("/api", apiRoutes);

module.exports = app;
