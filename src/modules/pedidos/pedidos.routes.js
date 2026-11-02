import { Router } from "express";
import { autenticarToken } from "../../middlewares/auth.middleware.js";
import { crearPedido } from "./pedidos.controller.js";
const router = Router();

// Crear un pedido: requiere iniciar sesión
router.post("/", autenticarToken, crearPedido);

export default router;