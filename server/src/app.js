const express = require("express");
const cors = require("cors");
const session = require("express-session");
const apiRoutes = require("./api");

const app = express();

// 1) Parse JSON primero
app.use(express.json());

// 2) CORS robusto (con cookies/sesión)
const allowedOrigins = ["http://localhost:5173", "http://localhost:8080"];

const corsOptions = {
  origin: (origin, cb) => {
    // Permite requests sin Origin (Postman/curl) y orígenes permitidos
    if (!origin) return cb(null, true);
    return allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// IMPORTANT: responder a preflight para cualquier ruta
app.options(/.*/, cors(corsOptions));

// 3) Session después de CORS
app.use(
  session({
    secret: "contraseñacookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // localhost (true solo si https)
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2, // 2 horas (mejor así que 10000*...)
    },
  })
);

// 4) Rutas
app.use("/api", apiRoutes);

module.exports = app;
