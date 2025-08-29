const { 
    agregarProductosCarritoServices, 
    eliminarProductoCarritoIdServices, 
    obtenerTodosLosProductosDelCarritoServices,
    mercadoPagoServices, mercadoPagoServicess 
} = require("../services/carritos.services");


const obtenerTodosLosProductosDelCarrito = async (req, res) => {
    const { msg, productos, error, statusCode } = await obtenerTodosLosProductosDelCarritoServices(req.idCarrito)
    try {
        res.status(statusCode).json({msg, productos})
    } catch {
        res.status(statusCode).json({error})
    }
}

const agregarProductosCarrito = async (req, res) => {
    const { statusCode, msg, error } = await agregarProductosCarritoServices(req.idCarrito, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

const eliminarProductoCarritoId = async (req, res) => {
    const { msg, statusCode, error } = await eliminarProductoCarritoIdServices(req.idCarrito, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

const pagarCarritoMp = async (req, res) => { 
    const {statusCode, msg, error, init_point} = await mercadoPagoServices();
    try {
        res.status(statusCode).json({msg, init_point});
    } catch {
        res.status(statusCode).json({error});
    }
};

const pagarPlanMp = async (req, res) => {
  try {
    console.log(req.body)
    const { nombre, precio } = req.body;  // recibe del front

    if (!nombre || !precio) {
      return res.status(400).json({ msg: "Faltan datos del plan" });
    }

    const { statusCode, msg, init_point, error } = await mercadoPagoServicess({ nombre, precio });

    if (error) {
      return res.status(500).json({ error: "Error creando preferencia Mercado Pago" });
    }

    return res.status(statusCode).json({ msg, init_point });
  } catch (error) {
    console.error("Error en pagarPlanMp:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


module.exports = { agregarProductosCarrito,
     eliminarProductoCarritoId, 
     obtenerTodosLosProductosDelCarrito, 
     pagarCarritoMp, pagarPlanMp }