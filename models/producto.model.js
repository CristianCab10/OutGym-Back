const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  imagen: {
    type: String,
    
  },
  habilitado: {
    type: Boolean,
    default: false,
  },
  fechaReg: {
    type: Date,
    default: Date.now(),
  },
});

const ProductosModel = mongoose.model("productos", ProductoSchema);
module.exports = ProductosModel;
