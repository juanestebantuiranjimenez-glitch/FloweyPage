
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "./usuarios.model.js";

export async function registrarUsuario(datos) {
  const nombre = datos.nombre;
  const correo = datos.correo?.trim().toLowerCase();
  const password = datos.password;

  if (!nombre || !correo || !password) {
    const error = new Error(
      "El nombre, el correo y la contraseña son obligatorios"
    );
    error.status = 400;
    throw error;
  }

  if (typeof nombre !== "string" ||
      typeof correo !== "string" ||
      typeof password !== "string") {
    const error = new Error("Los datos enviados no son válidos");
    error.status = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error(
      "La contraseña debe tener al menos 8 caracteres"
    );
    error.status = 400;
    throw error;
  }

  const usuarioExistente = await Usuario.findOne({ correo });

  if (usuarioExistente) {
    const error = new Error("Ya existe una cuenta con ese correo");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const usuario = await Usuario.create({
    nombre,
    correo,
    password: passwordHash,
    rol: "cliente"
  });

  return {
    id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol
  };
}

export async function iniciarSesion(datos) {
  const correo = datos.correo?.trim().toLowerCase();
  const password = datos.password;

  if (
    typeof correo !== "string" ||
    typeof password !== "string" ||
    !correo ||
    !password
  ) {
    const error = new Error("El correo y la contraseña son obligatorios");
    error.status = 400;
    throw error;
  }

  const usuario = await Usuario.findOne({ correo }).select("+password");

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    const error = new Error("Correo o contraseña incorrectos");
    error.status = 401;
    throw error;
  }

  if (!usuario.activo) {
    const error = new Error("La cuenta está desactivada");
    error.status = 403;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Falta configurar JWT_SECRET en el archivo .env");
  }

  const token = jwt.sign(
    {
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      subject: usuario._id.toString(),
      expiresIn: "2h"
    }
  );

  return {
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    },
    token
  };
}
