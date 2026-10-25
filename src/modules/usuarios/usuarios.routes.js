import { Router } from "express";
import {
    iniciarSesion,
    registrarUsuario
} from "./usuarios.controller.js";

const router = Router();

router.post("/registro", registrarUsuario);
router.post("/login", iniciarSesion);

export default router;
