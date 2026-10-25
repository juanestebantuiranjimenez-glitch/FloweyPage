import mongoose from "mongoose";

const floristeriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la floristería es obligatorio"],
      trim: true,
      minlength: 2
    },

    contacto: {
      type: String,
      required: [true, "El nombre de la persona de contacto es obligatorio"],
      trim: true
    },

    telefono: {
      type: String,
      required: [true, "El teléfono es obligatorio"],
      trim: true
    },

    correo: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },

    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true
    },

    zonasCobertura: {
      type: [String],
      required: true,
      validate: {
        validator: (zonas) => zonas.length > 0,
        message: "Debes registrar al menos una zona de cobertura"
      }
    },

    costoBaseEntrega: {
      type: Number,
      required: true,
      min: [0, "El costo de entrega no puede ser negativo"],
      default: 0
    },

    costoPorKm: {
      type: Number,
      required: true,
      min: [0, "El costo por kilómetro no puede ser negativo"],
      default: 0
    },

    activo: {
      type: Boolean,
      default: true
    },

    observaciones: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Floristeria = mongoose.model(
  "Floristeria",
  floristeriaSchema
);
