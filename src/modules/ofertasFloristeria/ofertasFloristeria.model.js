
import mongoose from "mongoose";

const ofertaFloristeriaSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: [true, "El producto es obligatorio"]
    },

    floristeria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floristeria",
      required: [true, "La floristería es obligatoria"]
    },

    costoFloristeria: {
      type: Number,
      required: [true, "El costo para la floristería es obligatorio"],
      min: [0, "El costo no puede ser negativo"]
    },

    disponible: {
      type: Boolean,
      default: true
    },

    tiempoPreparacionHoras: {
      type: Number,
      default: 24,
      min: [0, "El tiempo de preparación no puede ser negativo"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Un producto solo puede tener una oferta por floristería.
ofertaFloristeriaSchema.index(
  { producto: 1, floristeria: 1 },
  { unique: true }
);

export const OfertaFloristeria = mongoose.model(
  "OfertaFloristeria",
  ofertaFloristeriaSchema
);
