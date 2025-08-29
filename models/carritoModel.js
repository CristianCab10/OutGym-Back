const { Schema, model } = require("mongoose")

const CarritoSchema = new Schema({
    idUsuario: {
        type: String
    },
    productos: []
})

const CarritosModel = model("carrito", CarritoSchema)
module.exports = CarritosModel