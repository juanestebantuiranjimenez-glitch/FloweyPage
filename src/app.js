import express from "express";
import productosRoutes from "./modules/productos/productos.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    estado: "ok",
    proyecto: "FloweyPage",
    mensaje: "API funcionando"
  });
});

app.use("/api/productos", productosRoutes);

export default app;
