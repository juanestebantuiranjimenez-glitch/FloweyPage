
import mongoose from "mongoose";
import { Producto } from "../productos/productos.model.js";
import { Usuario } from "../usuarios/usuarios.model.js";
import { Pedido } from "./pedidos.model.js";

export async function crearPedido(clienteId, datos) {
  // 1. Comprobar que el ID del cliente sea válido.
  if (!mongoose.isValidObjectId(clienteId)) {
    const error = new Error("El cliente no tiene un ID válido");
    error.status = 400;
    throw error;
  }

  // 2. Comprobar que el producto exista y esté disponible.
  if (!mongoose.isValidObjectId(datos.producto)) {
    const error = new Error("El ID del producto no es válido");
    error.status = 400;
    throw error;
  }

  const producto = await Producto.findOne({
    _id: datos.producto,
    disponible: true
  });

  if (!producto) {
    const error = new Error("El producto no existe o no está disponible");
    error.status = 404;
    throw error;
  }

  // 3. Validar la cantidad.
  const cantidad = Number(datos.cantidad ?? 1);

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    const error = new Error("La cantidad debe ser un entero mayor que cero");
    error.status = 400;
    throw error;
  }

  // 4. Comprobar que el cliente siga existiendo y esté activo.
  const cliente = await Usuario.findOne({
    _id: clienteId,
    activo: true
  });

  if (!cliente) {
    const error = new Error("El cliente no existe o está inactivo");
    error.status = 404;
    throw error;
  }

  if (cliente.rol !== "cliente") {
    const error = new Error("Solo los clientes pueden crear pedidos");
    error.status = 403;
    throw error;
  }

  // 5. Validar la información de entrega.
  const { destinatario, entrega } = datos;

  if (
    !destinatario?.nombre?.trim() ||
    !destinatario?.telefono?.trim()
  ) {
    const error = new Error(
      "Debes indicar el nombre y teléfono del destinatario"
    );
    error.status = 400;
    throw error;
  }

  if (
    !entrega?.direccion?.trim() ||
    !entrega?.ciudad?.trim() ||
    !entrega?.fechaProgramada ||
    !["inmediata", "programada"].includes(entrega?.tipo)
  ) {
    const error = new Error("Los datos de entrega están incompletos");
    error.status = 400;
    throw error;
  }

  const fechaEntrega = new Date(entrega.fechaProgramada);

  if (Number.isNaN(fechaEntrega.getTime())) {
    const error = new Error("La fecha de entrega no es válida");
    error.status = 400;
    throw error;
  }

  if (fechaEntrega < new Date()) {
    const error = new Error("La fecha de entrega no puede estar en el pasado");
    error.status = 400;
    throw error;
  }

  // 6. Calcular los importes en el servidor.
  const precioUnitario = producto.precio;
  const subtotal = precioUnitario * cantidad;

  // La tarifa de entrega se calculará en una etapa posterior.
  const costoEntrega = 0;
  const total = subtotal + costoEntrega;

  // 7. Guardar el pedido en MongoDB.
  return Pedido.create({
    cliente: cliente._id,
    producto: producto._id,
    cantidad,
    precioUnitario,
    subtotal,
    costoEntrega,
    total,
    destinatario: {
      nombre: destinatario.nombre.trim(),
      telefono: destinatario.telefono.trim(),
      mensajeTarjeta: destinatario.mensajeTarjeta ?? ""
    },
    entrega: {
      direccion: entrega.direccion.trim(),
      ciudad: entrega.ciudad.trim(),
      fechaProgramada: fechaEntrega,
      tipo: entrega.tipo,
      instrucciones: entrega.instrucciones ?? ""
    },
    estado: "pendiente_asignacion"
  });
}
