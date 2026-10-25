import { Router } from "express";
import {
    crearProducto,
    listarProductos
} from "./productos.controller.js";

const router = Router();

router.get("/", listarProductos);
router.post("/", crearProducto);

export default router;
