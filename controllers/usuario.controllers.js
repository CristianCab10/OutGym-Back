const { obtenerTodosLosUsuariosServices, obtenerUsuarioPorIdServices, crearUsuarioServices, iniciarSesionServices, recuperarPassUserServices, cambioPassUserTokenServices, actualizarUsuarioServices, eliminarUsuarioServices  } = require("../services/usuarios.services")
const { validationResult } = require("express-validator")

const obtenerTodosLosUsuarios = async (req,res) => {
    const {statusCode, usuarios} = await obtenerTodosLosUsuariosServices()
    res.status(statusCode).json({ usuarios })
}

const obtenerUsuarioPorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: "Se encontraron errores en el servidor",
      errors: errors.array(),
    });
  }

  const { statusCode, usuario } = await obtenerUsuarioPorIdServices(req.params.id);

  res.status(statusCode).json(usuario); 
};

const crearNuevoUsuario = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({ msg: "Se encontraron errores en el servidor", errors: errors.array() })
    }
    const {statusCode, msg} = await crearUsuarioServices(req.body)
    try {
        res.status(statusCode).json({ msg })
    } catch (error) {
        res.status(statusCode).json({ error })
    }
}

const iniciarSesion = async (req, res) => {
    const {statusCode, msg, token, rol} = await iniciarSesionServices(req.body)
    res.status(statusCode).json({ msg, token, rol })
}

const recuperarPassUser = async (req, res) => {
    const { msg, statusCode, error } = await recuperarPassUserServices(req.body.emailUsuario)
    try {
        res.status(statusCode).json({ msg })
    } catch {
        res.status(statusCode).json({ error })
    }
}

const cambioPassUserToken = async (req, res) => {
    const { msg, statusCode, error } = await cambioPassUserTokenServices(req.query.token, req.body.password)
    try {
        res.status(statusCode).json({ msg })
    } catch {
        res.status(statusCode).json({ error })
    }
}

const actualizarUsuario = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: "Se encontraron errores en el servidor", errors: errors.array() })
    }

    const { id } = req.params
    const { statusCode, msg, usuario, error } = await actualizarUsuarioServices(id, req.body)

    if (error) {
        return res.status(statusCode).json({ error })
    }

    return res.status(statusCode).json({ msg, usuario })
}


const eliminarUsuario = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: "Se encontraron errores en el servidor", errors: errors.array() })
    }

    const { id } = req.params
    const { statusCode, msg, error } = await eliminarUsuarioServices(id)

    if (error) {
        return res.status(statusCode).json({ error })
    }

    return res.status(statusCode).json({ msg })
}


module.exports = { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearNuevoUsuario, iniciarSesion, recuperarPassUser, cambioPassUserToken, actualizarUsuario, eliminarUsuario }