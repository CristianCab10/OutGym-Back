const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {

  const authHeader = req.header("Authorization")
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  try {
    const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verificarUsuario);

    if (rolRuta === verificarUsuario.rolUsuario) {
      req.idCarrito = verificarUsuario.idCarrito;
      req.idUsuario = verificarUsuario.idUsuario;
      next();
    } else {
      res.status(401).json({ msg: "No estás autorizado" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

