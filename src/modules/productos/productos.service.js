import { Producto } from "./productos.model.js";

export function listarProductos() {
  return Producto.find().sort({ createdAt: -1 });
}

export function crearProducto(datos) {
  const producto = new Producto(datos);
  return producto.save();
}
