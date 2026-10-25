
import {
    buscarOfertaPorId,
    crearOferta as guardarOferta,
    actualizarOferta as modificarOferta,
    listarOfertas as obtenerOfertas
} from "./ofertasFloristeria.service.js";

function esIdValido(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

function responderError(error, res) {
  if (error.status) {
    return res.status(error.status).json({
      mensaje: error.message
    });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      mensaje: "Los datos enviados no son válidos",
      error: error.message
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      mensaje: "Este producto ya está relacionado con esa floristería"
    });
  }

  return null;
}

export async function listarOfertas(req, res, next) {
  try {
    const ofertas = await obtenerOfertas();

    res.status(200).json({
      mensaje: "Ofertas consultadas correctamente",
      datos: ofertas
    });
  } catch (error) {
    next(error);
  }
}

export async function obtenerOferta(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID de la oferta no es válido"
      });
    }

    const oferta = await buscarOfertaPorId(id);

    if (!oferta) {
      return res.status(404).json({
        mensaje: "Oferta no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Oferta consultada correctamente",
      datos: oferta
    });
  } catch (error) {
    next(error);
  }
}

export async function crearOferta(req, res, next) {
  try {
    const oferta = await guardarOferta(req.body);

    res.status(201).json({
      mensaje: "Oferta registrada correctamente",
      datos: oferta
    });
  } catch (error) {
    if (responderError(error, res)) return;
    next(error);
  }
}

export async function actualizarOferta(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID de la oferta no es válido"
      });
    }

    const oferta = await modificarOferta(id, req.body);

    if (!oferta) {
      return res.status(404).json({
        mensaje: "Oferta no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Oferta actualizada correctamente",
      datos: oferta
    });
  } catch (error) {
    if (responderError(error, res)) return;
    next(error);
  }
}
