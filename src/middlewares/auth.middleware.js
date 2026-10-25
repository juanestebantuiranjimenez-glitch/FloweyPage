import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next) {
  const encabezado = req.headers.authorization;

  if (!encabezado || !encabezado.startsWith("Bearer ")) {
    return res.status(401).json({
      mensaje: "Debes iniciar sesión para realizar esta acción"
    });
  }

  const token = encabezado.split(" ")[1];

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: datos.sub,
      rol: datos.rol
    };

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "El token es inválido o ha expirado"
    });
  }
}

export function soloAdministrador(req, res, next) {
  if (req.usuario?.rol !== "administrador") {
    return res.status(403).json({
      mensaje: "No tienes permisos para realizar esta acción"
    });
  }

  next();
}