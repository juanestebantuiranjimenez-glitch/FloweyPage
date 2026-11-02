
import { crearPedido as guardarPedido } from "./pedidos.service.js";

export async function crearPedido(req, res) {
  try {
    // El ID del cliente viene del token JWT.
    const clienteId = req.usuario.id;

    // Enviar los datos al servicio.
    const pedido = await guardarPedido(clienteId, req.body);

    return res.status(201).json({
      mensaje: "Pedido creado correctamente",
      datos: pedido
    });

  } catch (error) {
    console.error("Error al crear pedido:", error.message);

    return res.status(error.status || 500).json({
      mensaje: error.status
        ? error.message
        : "Error interno al crear el pedido"
    });
  }
}
