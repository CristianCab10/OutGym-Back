require("dotenv").config();
require("./db/config.db");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/carritos", require("./routes/carritos.routes"));
app.use("/bookings", require("./routes/bookings"));
app.use("/api/productos", require("./routes/productos.routes"));

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo conectado");
    app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));
  })
  .catch(err => console.error("Error al conectar MongoDB:", err));
