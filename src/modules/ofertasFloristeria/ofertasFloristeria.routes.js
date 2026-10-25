
import { Router } from "express";

import {
    actualizarOferta,
    crearOferta,
    listarOfertas,
    obtenerOferta
} from "./ofertasFloristeria.controller.js";

import {
    autenticarToken,
    soloAdministrador
} from "../../middlewares/auth.middleware.js";

const router = Router();

// Consultas públicas.
router.get("/", listarOfertas);
router.get("/:id", obtenerOferta);

// Gestión exclusiva del administrador.
router.post("/", autenticarToken, soloAdministrador, crearOferta);
router.patch("/:id", autenticarToken, soloAdministrador, actualizarOferta);

export default router;
