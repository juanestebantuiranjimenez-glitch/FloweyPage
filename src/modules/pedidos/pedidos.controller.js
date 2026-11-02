
import {
  crearPedido as guardarPedido,
  listarPedidosCliente,
  listarTodosLosPedidos
} from "./pedidos.service.js";

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

// Consultar los pedidos del cliente autenticado
export async function obtenerMisPedidos(req, res) {
  try {
    const pedidos = await listarPedidosCliente(req.usuario.id);

    return res.status(200).json({
      mensaje: "Pedidos consultados correctamente",
      total: pedidos.length,
      datos: pedidos
    });
  } catch (error) {
    console.error("Error al consultar pedidos del cliente:", error.message);

    return res.status(500).json({
      mensaje: "Error al consultar tus pedidos"
    });
  }
}

// Consultar todos los pedidos (administrador)
export async function obtenerTodosLosPedidos(req, res) {
  try {
    const pedidos = await listarTodosLosPedidos();

    return res.status(200).json({
      mensaje: "Pedidos consultados correctamente",
      total: pedidos.length,
      datos: pedidos
    });
  } catch (error) {
    console.error("Error al consultar todos los pedidos:", error.message);

    return res.status(500).json({
      mensaje: "Error al consultar los pedidos"
    });
  }
}