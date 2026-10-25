
import "dotenv/config";
import app from "./app.js";
import { conectarDB } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  await conectarDB();

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`FloweyPage ejecutándose en http://127.0.0.1:${PORT}`);
  });
}

iniciarServidor().catch((error) => {
  console.error("No se pudo iniciar el servidor:", error);
  process.exit(1);
});
