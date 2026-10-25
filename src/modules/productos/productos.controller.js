
import {
  eliminarProducto as borrarProducto,
  buscarProductoPorId,
  crearProducto as guardarProducto,
  actualizarProducto as modificarProducto,
  listarProductos as obtenerProductos
} from "./productos.service.js";

function esIdValido(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

export async function listarProductos(req, res, next) {
  try {
    const productos = await obtenerProductos();

    res.status(200).json({
      mensaje: "Productos consultados correctamente",
      datos: productos
    });
  } catch (error) {
    next(error);
  }
}

export async function obtenerProducto(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID del producto no es válido"
      });
    }

    const producto = await buscarProductoPorId(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto consultado correctamente",
      datos: producto
    });
  } catch (error) {
    next(error);
  }
}

export async function crearProducto(req, res, next) {
  try {
    const producto = await guardarProducto(req.body);

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      datos: producto
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Los datos del producto no son válidos",
        error: error.message
      });
    }

    next(error);
  }
}

export async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID del producto no es válido"
      });
    }

    const camposPermitidos = [
      "nombre",
      "descripcion",
      "precio",
      "categoria",
      "disponible"
    ];

    const datos = {};

    for (const campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        datos[campo] = req.body[campo];
      }
    }

    if (Object.keys(datos).length === 0) {
      return res.status(400).json({
        mensaje: "Debes enviar al menos un campo para actualizar"
      });
    }

    const producto = await modificarProducto(id, datos);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      datos: producto
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Los datos del producto no son válidos",
        error: error.message
      });
    }

    next(error);
  }
}

export async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID del producto no es válido"
      });
    }

    const producto = await borrarProducto(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
      datos: producto
    });
  } catch (error) {
    next(error);
  }
}
