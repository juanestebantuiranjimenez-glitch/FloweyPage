
import { Router } from "express";

import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    listarProductos,
    obtenerProducto
} from "./productos.controller.js";

import {
    autenticarToken,
    soloAdministrador
} from "../../middlewares/auth.middleware.js";

const router = Router();

// Consultas públicas: cualquier visitante puede ver el catálogo.
router.get("/", listarProductos);
router.get("/:id", obtenerProducto);

// Operaciones administrativas: requieren autenticación y rol administrador.
router.post("/", autenticarToken, soloAdministrador, crearProducto);
router.put("/:id", autenticarToken, soloAdministrador, actualizarProducto);
router.delete("/:id", autenticarToken, soloAdministrador, eliminarProducto);

export default router;
