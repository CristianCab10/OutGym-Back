const cloudinary = require("../middlewares/cloudinary.config.middlewares");
const ProductosModel = require("../models/producto.model");

const obtenerTodosLosProductosServices = async () => {
  const productos = await ProductosModel.find();
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerUnProductoPorIDServices = async (idProducto) => {
  const producto = await ProductosModel.findOne({ _id: idProducto });
  return {
    producto,
    statusCode: 200,
  };
};

const crearNuevoProductoServices = async (body, file) => {
  const nuevoProducto = new ProductosModel(body);

  await nuevoProducto.save();
  return {
    msg: "Producto creado con exito",
    idProducto: nuevoProducto._id,
    statusCode: 201,
  };
};

const crearEditarImagenService = async (idProducto, file) => {
  try {
    const producto = await ProductosModel.findById(idProducto);

    const imagenCloud = await cloudinary.uploader.upload(file.path);
    producto.imagen = imagenCloud.secure_url;

    await producto.save();

    return {
      msg: "Imagen cargada",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarProductoPorIDServices = async (idProducto, body) => {
  await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);
  return {
    msg: "Producto editado con exito",
    statusCode: 200,
  };
};

const eliminarUnProductoPorIdServices = async (idProducto) => {
  await ProductosModel.findByIdAndDelete({ _id: idProducto });

  return {
    msg: "Producto eliminado",
    statusCode: 200,
  };
};

const cambiarEstadoProductoServices = async (idProducto) => {
  try {
    const producto = await ProductosModel.findById(idProducto);
    console.log(producto);

    if (producto.habilitado) {
      producto.habilitado = false;
    } else {
      producto.habilitado = true;
    }

    console.log(producto);
    await producto.save();

    return {
      msg: `Producto ${producto.habilitado ? "habilitado" : "deshabilitado"}`,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  crearEditarImagenService,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
  cambiarEstadoProductoServices,
};
