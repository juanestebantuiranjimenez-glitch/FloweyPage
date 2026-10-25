import {
    crearProducto as guardarProducto,
    listarProductos as obtenerProductos
} from "./productos.service.js";

export async function listarProductos(req, res) {
  const productos = await obtenerProductos();
  res.status(200).json({
    mensaje: "Productos consultados correctamente",
    datos: productos
  });
}

export async function crearProducto(req, res) {
  try {
    const producto = await guardarProducto(req.body);

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      datos: producto
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos del producto no son válidos",
        error: error.message
      });
    }

    throw error;
  }
}
