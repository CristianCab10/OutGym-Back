require("dotenv").config();
require("./db/config.db");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://out-gym-front.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Archivos estáticos
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/carritos", require("./routes/carritos.routes"));
app.use("/bookings", require("./routes/bookings"));
app.use("/api/productos", require("./routes/productos.routes"));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo conectado");
    app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
  })
  .catch(err => console.error("Error al conectar MongoDB:", err));
