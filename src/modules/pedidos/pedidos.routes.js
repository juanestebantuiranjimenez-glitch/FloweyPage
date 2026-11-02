import { Router } from "express";

import {
    crearPedido,
    obtenerMisPedidos,
    obtenerTodosLosPedidos
} from "./pedidos.controller.js";

import {
    autenticarToken,
    soloAdministrador
} from "../../middlewares/auth.middleware.js";

const router = Router();

// Crear un pedido (solo clientes)
router.post("/", autenticarToken, crearPedido);

// Consultar los pedidos del cliente autenticado
router.get("/mis-pedidos", autenticarToken, obtenerMisPedidos);

// Consultar todos los pedidos (solo administrador)
router.get("/", autenticarToken, soloAdministrador, obtenerTodosLosPedidos);

export default router;