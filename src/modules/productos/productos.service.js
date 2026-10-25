import { Producto } from "./productos.model.js";

export function listarProductos() {
  return Producto.find().sort({ createdAt: -1 });
}

export function buscarProductoPorId(id) {
  return Producto.findById(id);
}

export function crearProducto(datos) {
  const producto = new Producto(datos);
  return producto.save();
}

export function actualizarProducto(id, datos) {
  return Producto.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true
  });
}

export function eliminarProducto(id) {
  return Producto.findByIdAndDelete(id);
}