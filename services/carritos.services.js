const { MercadoPagoConfig, Preference } = require("mercadopago");


const obtenerTodosLosProductosDelCarritoServices = async (idCarrito) => {
    try {
        const carrito = await CarritosModel.findOne({_id: idCarrito})
        return {
            productos: carrito.productos,
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const agregarProductosCarritoServices = async (idCarrito, idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})
        
        const productoExiste = carrito.productos.find((prod) => prod._id.toString() === producto._id.toString())
        if(productoExiste) {
            return{
                msg: "El producto ya está en el carrito",
                statusCode: 422
            }
        }
        carrito.productos.push(producto)
        await carrito.save()

        return {
            msg: "Producto cargado al carrito",
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const eliminarProductoCarritoIdServices = async (idCarrito, idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})
        const productoExiste = carrito.productos.find((prod) => prod._id.toString() === idProducto)
        if(!productoExiste) {
            return {
                msg: "ERROR. El producto que inenta borrar no existe",
                statusCode: 404
            }
        }
        const productoIndex = carrito.productos.findIndex((prod) => prod._id.toString() === idProducto)
        carrito.productos.splice(productoIndex, 1)
        await carrito.save()
        return {
            msg: "Producto eliminado",
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const mercadoPagoServices = async (carrito) => {
    try {
        const client = new MercadoPagoConfig({
            accessToken: `${process.env.ACCESS_TOKEN_MP}`
        });

        const preference = new Preference(client);

        const res = await preference.create({
            body: {
                items: [
                    {
                        title: "Membresía Gym",
                        quantity: 1,
                        unit_price: 2000,
                        currency_id: "ARS"
                    }
                ],
                back_urls: {
                    success: "https://www.success.com",
                    failure: "http://www.failure.com",
                    pending: "http://www.pending.com"
                },
                auto_return: "approved"
            }
        });

        console.log("Preferencia creada:", res);

        return {
            msg: "Preferencia creada con éxito",
            preferenceId: res.id,
            init_point: res.init_point, 
            statusCode: 201
        };
    } catch (error) {
        console.log("Error Mercado Pago:", error);
        return {
            error,
            statusCode: 500
        };
    }
};

const mercadoPagoServicess = async (plan) => {
   try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.ACCESS_TOKEN_MP,
    });

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items: [
          {
            title: plan.nombre,
            quantity: 1,
            unit_price: plan.precio,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://tu-dominio.com/pago-exitoso",
          failure: "https://tu-dominio.com/pago-fallido",
          pending: "https://tu-dominio.com/pago-pendiente",
        },
        auto_return: "approved",
      },
    });

    return {
      msg: "Preferencia creada con éxito",
      init_point: res.init_point,  // sin .body
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error Mercado Pago:", error);
    return {
      error,
      statusCode: 500,
    };
  }
};


module.exports = { 
    agregarProductosCarritoServices, 
    eliminarProductoCarritoIdServices, 
    obtenerTodosLosProductosDelCarritoServices,
    mercadoPagoServices, mercadoPagoServicess 
};