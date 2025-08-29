const {Schema, model} = require("mongoose")
const UsuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: [true, "Campo nombreUsuario obligatorio"],
        trim: true,
        unique: true
    },
    emailUsuario: {
        type: String,
        required: true,
        trim: true,
    },
    rolUsuario:{
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario"
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    idCarrito:{
        type: String,
    }
})

const UsuariosModel = model("usuarios", UsuarioSchema)
module.exports = UsuariosModel