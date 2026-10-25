
import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";
import { Usuario } from "../src/modules/usuarios/usuarios.model.js";

async function crearAdministrador() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const correo = "admin@floweypage.com";
    const password = process.env.ADMIN_PASSWORD;

    if (!password || password.length < 12) {
      throw new Error(
        "Define ADMIN_PASSWORD en .env con al menos 12 caracteres."
      );
    }

    const existente = await Usuario.findOne({ correo });

    if (existente) {
      console.log("El usuario administrador ya existe.");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await Usuario.create({
      nombre: "Administrador FloweyPage",
      correo,
      password: passwordHash,
      rol: "administrador"
    });

    console.log("Administrador creado correctamente.");
    console.log("Correo:", correo);
  } catch (error) {
    console.error("No se pudo crear el administrador:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

crearAdministrador();
