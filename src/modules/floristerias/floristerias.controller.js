
import {
    buscarFloristeriaPorId,
    desactivarFloristeria as darDeBaja,
    crearFloristeria as guardarFloristeria,
    actualizarFloristeria as modificarFloristeria,
    listarFloristerias as obtenerFloristerias
} from "./floristerias.service.js";

import {
    listarFloristeriasActivas
} from "./floristerias.service.js";


function esIdValido(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

function manejarErrorDatos(error, res) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      mensaje: "Los datos de la floristería no son válidos",
      error: error.message
    });
  }

  return null;
}

export async function listarFloristerias(req, res, next) {
  try {
    const floristerias = await obtenerFloristerias();

    res.status(200).json({
      mensaje: "Floristerías consultadas correctamente",
      datos: floristerias
    });
  } catch (error) {
    next(error);
  }
}

export async function obtenerFloristeria(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID de la floristería no es válido"
      });
    }

    const floristeria = await buscarFloristeriaPorId(id);

    if (!floristeria) {
      return res.status(404).json({
        mensaje: "Floristería no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Floristería consultada correctamente",
      datos: floristeria
    });
  } catch (error) {
    next(error);
  }
}

export async function crearFloristeria(req, res, next) {
  try {
    const floristeria = await guardarFloristeria(req.body);

    res.status(201).json({
      mensaje: "Floristería registrada correctamente",
      datos: floristeria
    });
  } catch (error) {
    if (manejarErrorDatos(error, res)) return;
    next(error);
  }
}

export async function actualizarFloristeria(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID de la floristería no es válido"
      });
    }

    const camposPermitidos = [
      "nombre",
      "contacto",
      "telefono",
      "correo",
      "direccion",
      "zonasCobertura",
      "costoBaseEntrega",
      "costoPorKm",
      "activo",
      "observaciones"
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

    const floristeria = await modificarFloristeria(id, datos);

    if (!floristeria) {
      return res.status(404).json({
        mensaje: "Floristería no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Floristería actualizada correctamente",
      datos: floristeria
    });
  } catch (error) {
    if (manejarErrorDatos(error, res)) return;
    next(error);
  }
}

export async function desactivarFloristeria(req, res, next) {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        mensaje: "El ID de la floristería no es válido"
      });
    }

    const floristeria = await darDeBaja(id);

    if (!floristeria) {
      return res.status(404).json({
        mensaje: "Floristería no encontrada"
      });
    }

    res.status(200).json({
      mensaje: "Floristería desactivada correctamente",
      datos: floristeria
    });
  } catch (error) {
    next(error);
  }
}

export async function listarFloristeriasPublicas(req, res, next) {
  try {
    const datos = await listarFloristeriasActivas();

    res.status(200).json({
      mensaje: "Floristerías consultadas correctamente",
      datos
    });
  } catch (error) {
    next(error);
  }
}
