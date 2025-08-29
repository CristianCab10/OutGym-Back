const {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
  crearEditarImagenService,
  cambiarEstadoProductoServices,
} = require("../services/productos.services");
const ProductosModel = require("../models/producto.model");

const obtenerTodosLosProductos = async (req, res) => {
  const { productos, statusCode } = await obtenerTodosLosProductosServices();
  res.status(statusCode).json({ productos });
};

const obtenerUnProductoPorID = async (req, res) => {
  const { producto, statusCode } = await obtenerUnProductoPorIDServices(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = async (req, res) => {
  const { msg, statusCode, idProducto } = await crearNuevoProductoServices(
    req.body,
    req.file
  );
  res.status(statusCode).json({ msg, idProducto });
};

const crearEditarImagen = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;

    if (!req.file) {
      return res.status(400).json({ msg: "No se recibió ninguna imagen." });
    }

    const nombreImagen = req.file.filename;

    
    const productoActualizado = await ProductosModel.findByIdAndUpdate(
      idProducto,
      { imagen: nombreImagen },
      { new: true }
    );

    res.status(200).json({
      msg: "Imagen subida y producto actualizado.",
      producto: productoActualizado,
    });

  } catch (error) {
    console.error("Error en subir imagen:", error);
    res.status(500).json({ msg: "Error al subir imagen." });
  }
};

const actualizarProductoPorID = async (req, res) => {
  const { msg, statusCode } = await actualizarProductoPorIDServices(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ msg });
};

const eliminarUnProductoPorId = async (req, res) => {
  const { msg, statusCode } = await eliminarUnProductoPorIdServices(
    req.params.id
  );
  res.status(statusCode).json({ msg });
};

const cambiarEstadoProducto = async (req, res) => {
  const { msg, statusCode, error } = await cambiarEstadoProductoServices(
    req.params.idProducto
  );

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  crearEditarImagen,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
  cambiarEstadoProducto,
};
