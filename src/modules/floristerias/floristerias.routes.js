
import { Router } from "express";

import {
    actualizarFloristeria,
    crearFloristeria,
    desactivarFloristeria,
    listarFloristeriasPublicas,
    obtenerFloristeria
} from "./floristerias.controller.js";

import {
    autenticarToken,
    soloAdministrador
} from "../../middlewares/auth.middleware.js";

const router = Router();

// Consulta pública: solo floristerías activas.
router.get("/", listarFloristeriasPublicas);

// Consultar una floristería por ID.
router.get("/:id", obtenerFloristeria);

// Operaciones protegidas para administradores.
router.post(
  "/",
  autenticarToken,
  soloAdministrador,
  crearFloristeria
);

router.put(
  "/:id",
  autenticarToken,
  soloAdministrador,
  actualizarFloristeria
);

router.patch(
  "/:id/desactivar",
  autenticarToken,
  soloAdministrador,
  desactivarFloristeria
);

export default router;
