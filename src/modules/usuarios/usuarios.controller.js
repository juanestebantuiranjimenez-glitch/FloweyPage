
import {
    iniciarSesion as autenticarUsuario,
    registrarUsuario as guardarUsuario
} from "./usuarios.service.js";

export async function registrarUsuario(req, res, next) {
  try {
    const usuario = await guardarUsuario(req.body);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      datos: usuario
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Los datos del usuario no son válidos",
        error: error.message
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta con ese correo"
      });
    }

    if (error.status) {
      return res.status(error.status).json({
        mensaje: error.message
      });
    }

    next(error);
  }
}

export async function iniciarSesion(req, res, next) {
  try {
    const resultado = await autenticarUsuario(req.body);

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      datos: resultado
    });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({
        mensaje: error.message
      });
    }

    next(error);
  }
}
