
import mongoose from "mongoose";
import { Floristeria } from "../floristerias/floristerias.model.js";
import { Producto } from "../productos/productos.model.js";
import { OfertaFloristeria } from "./ofertasFloristeria.model.js";

export async function listarOfertas() {
  const ofertas = await OfertaFloristeria.find({ disponible: true })
    .populate({
      path: "producto",
      match: { disponible: true }
    })
    .populate({
      path: "floristeria",
      match: { activo: true }
    })
    .sort({ createdAt: -1 });

  return ofertas.filter(
    (oferta) => oferta.producto && oferta.floristeria
  );
}

export async function buscarOfertaPorId(id) {
  return OfertaFloristeria.findById(id)
    .populate("producto")
    .populate("floristeria");
}

export async function crearOferta(datos) {
  const { producto, floristeria, costoFloristeria } = datos;

  if (
    !mongoose.isValidObjectId(producto) ||
    !mongoose.isValidObjectId(floristeria)
  ) {
    const error = new Error("El ID del producto o de la floristería no es válido");
    error.status = 400;
    throw error;
  }

  const productoExiste = await Producto.findOne({
    _id: producto,
    disponible: true
  });

  if (!productoExiste) {
    const error = new Error("El producto no existe o no está disponible");
    error.status = 404;
    throw error;
  }

  const floristeriaExiste = await Floristeria.findOne({
    _id: floristeria,
    activo: true
  });

  if (!floristeriaExiste) {
    const error = new Error("La floristería no existe o está inactiva");
    error.status = 404;
    throw error;
  }

  const costo = Number(costoFloristeria);

  if (
    costoFloristeria === undefined ||
    costoFloristeria === null ||
    costoFloristeria === "" ||
    !Number.isFinite(costo) ||
    costo < 0
  ) {
    const error = new Error("Debes indicar un costo válido");
    error.status = 400;
    throw error;
  }

  return OfertaFloristeria.create({
    producto,
    floristeria,
    costoFloristeria: costo,
    tiempoPreparacionHoras: datos.tiempoPreparacionHoras ?? 24
  });
}

export async function actualizarOferta(id, datos) {
  const campos = {};

  if (datos.costoFloristeria !== undefined) {
    const costo = Number(datos.costoFloristeria);

    if (
      datos.costoFloristeria === "" ||
      !Number.isFinite(costo) ||
      costo < 0
    ) {
      const error = new Error("El costo debe ser un número no negativo");
      error.status = 400;
      throw error;
    }

    campos.costoFloristeria = costo;
  }

  if (datos.disponible !== undefined) {
    if (typeof datos.disponible !== "boolean") {
      const error = new Error("La disponibilidad debe ser true o false");
      error.status = 400;
      throw error;
    }

    campos.disponible = datos.disponible;
  }

  if (datos.tiempoPreparacionHoras !== undefined) {
    const horas = Number(datos.tiempoPreparacionHoras);

    if (
      datos.tiempoPreparacionHoras === "" ||
      !Number.isFinite(horas) ||
      horas < 0
    ) {
      const error = new Error("El tiempo de preparación no es válido");
      error.status = 400;
      throw error;
    }

    campos.tiempoPreparacionHoras = horas;
  }

  if (Object.keys(campos).length === 0) {
    const error = new Error("No enviaste campos válidos para actualizar");
    error.status = 400;
    throw error;
  }

  return OfertaFloristeria.findByIdAndUpdate(id, campos, {
    new: true,
    runValidators: true
  })
    .populate("producto")
    .populate("floristeria");
}
