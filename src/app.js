import express from "express";
import floristeriasRoutes from "./modules/floristerias/floristerias.routes.js";
import ofertasFloristeriaRoutes from "./modules/ofertasFloristeria/ofertasFloristeria.routes.js";
import productosRoutes from "./modules/productos/productos.routes.js";
import usuariosRoutes from "./modules/usuarios/usuarios.routes.js";

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

app.use("/api/usuarios", usuariosRoutes);

app.use("/api/floristerias", floristeriasRoutes);

app.use("/api/ofertas-floristeria", ofertasFloristeriaRoutes);

export default app;
