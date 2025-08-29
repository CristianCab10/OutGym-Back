const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
  crearEditarImagen,
  cambiarEstadoProducto,
} = require("../controllers/productos.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const multerMiddlewars = require("../middlewares/multer.middlewars");
const router = express.Router();
const upload = require("../middlewares/multer.middlewars");

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerUnProductoPorID);
router.post("/", crearNuevoProducto);
router.put(
  "/addEditImage/:idProducto",
  upload.single("imagen"),
  crearEditarImagen
);
router.put("/changeState/:idProducto", cambiarEstadoProducto);
router.put("/:id", actualizarProductoPorID);
router.delete("/:id", eliminarUnProductoPorId);

module.exports = router;
