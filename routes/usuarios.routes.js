const { Router } = require("express");
const {
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuario.controllers");

const { forgotPasswordController, resetPasswordController } = require("../controllers/recuperarPasswordController");
const { check } = require("express-validator");

const router = Router();

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", [check("id","Formato de ID incorrecto").isMongoId()], obtenerUsuarioPorId);
router.post("/", [
  check("nombreUsuario", "Campo NOMBRE vacio").notEmpty(),
  check("nombreUsuario", "Mínimo 5 caracteres").isLength({ min:5 }),
  check("emailUsuario", "Formato incorrecto").isEmail(),
  check("password", "Mínimo 8 caracteres").isLength({ min:8 })
], crearNuevoUsuario);
router.post("/login", iniciarSesion);
router.put("/:id", [
  check("id", "Formato de ID incorrecto").isMongoId()
], actualizarUsuario);
router.delete("/:id", [
  check("id", "Formato de ID incorrecto").isMongoId()
], eliminarUsuario);

module.exports = router;
