const UsuariosModel = require("../models/usuariosModel");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CarritosModel = require("../models/carritoModel");

const obtenerTodosLosUsuariosServices = async () => {
  const usuarios = await UsuariosModel.find();
  return {
    usuarios,
    statusCode: 200,
  };
};

const obtenerUsuarioPorIdServices = async (idUsuario) => {
  const usuario = await UsuariosModel.findOne({ _id: idUsuario });
  return {
    usuario,
    statusCode: 200,
  };
};

const crearUsuarioServices = async (body) => {
  try {
    const nuevoUsuario = new UsuariosModel(body);
    const carritoUsuario = new CarritosModel({ idUsuario: nuevoUsuario._id });
    nuevoUsuario.password = await argon.hash(nuevoUsuario.password);
    nuevoUsuario.idCarrito = carritoUsuario._id;
   
    await nuevoUsuario.save();
    await carritoUsuario.save();
    return {
      msg: "Usuario creado",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const iniciarSesionServices = async (body) => {
  const usuarioExiste = await UsuariosModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });
  if (!usuarioExiste) {
    return {
      msg: "usuario y/o contraseña incorrecto. USER",
      statusCode: 400,
    };
  }
  const passCheck = await argon.verify(usuarioExiste.password, body.password);
  if (!passCheck) {
    return {
      msg: "usuario y/o contraseña incorrecto. PASS",
      statusCode: 400,
    };
  }

  const payload = {
    idUsuario: usuarioExiste._id,
    idCarrito: usuarioExiste.idCarrito,
    rolUsuario: usuarioExiste.rolUsuario,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

  return {
    msg: "usuario logueado con éxito",
    token,
    rol: usuarioExiste.rolUsuario,
    statusCode: 200,
  };
};

const recuperarPassUserServices = async (emailUsuario) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({ emailUsuario });
    if (usuarioExiste) {
      const payload = {
        idUsuario: usuarioExiste._id,
      };
      const tokenRecuperarPass = jwt.sign(
        payload,
        process.env.JWT_SECRET_RECOVERY_PASS
      );
      await recuperarPassword(tokenRecuperarPass, usuarioExiste.emailUsuario);
      return {
        msg: "Mail enviado",
        statusCode: 200,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      error,
      statusCode: 500,
    };
  }
};

const cambioPassUserTokenServices = async (token, newPass) => {
  try {
    const verificarUser = jwt.verify(
      token,
      process.env.JWT_SECRET_RECOVERY_PASS
    );
    const usuario = await UsuariosModel.findOne({
      _id: verificarUser.idUsuario,
    });
    usuario.password = await argon.hash(newPass);
    await usuario.save();
    return {
      msg: "Cambio de contraseña exitoso",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarUsuarioServices = async (idUsuario, body) => {
    try {
        const usuarioActualizado = await UsuariosModel.findByIdAndUpdate(idUsuario, body, { new: true })
        return {
            msg: "Usuario actualizado",
            usuario: usuarioActualizado,
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const eliminarUsuarioServices = async (idUsuario) => {
    try {
        await UsuariosModel.findByIdAndDelete(idUsuario)
        return {
            msg: "Usuario eliminado",
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}



module.exports = { obtenerTodosLosUsuariosServices, obtenerUsuarioPorIdServices, crearUsuarioServices, iniciarSesionServices, recuperarPassUserServices, cambioPassUserTokenServices, actualizarUsuarioServices, eliminarUsuarioServices }
