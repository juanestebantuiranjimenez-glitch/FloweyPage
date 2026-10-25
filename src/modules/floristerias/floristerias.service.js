
import { Floristeria } from "./floristerias.model.js";

export function listarFloristerias() {
  return Floristeria.find().sort({ createdAt: -1 });
}

export function buscarFloristeriaPorId(id) {
  return Floristeria.findById(id);
}

export function crearFloristeria(datos) {
  const floristeria = new Floristeria(datos);
  return floristeria.save();
}

export function actualizarFloristeria(id, datos) {
  return Floristeria.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true
  });
}

export function desactivarFloristeria(id) {
  return Floristeria.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true, runValidators: true }
  );
}

export function listarFloristeriasActivas() {
  return Floristeria.find({ activo: true }).sort({ nombre: 1 });
}
