import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: 2
    },
    descripcion: {
      type: String,
      default: "",
      trim: true
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    },
    categoria: {
      type: String,
      enum: ["rosas", "girasoles", "mixtos", "personalizados"],
      required: [true, "La categoría es obligatoria"]
    },
    disponible: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Producto = mongoose.model("Producto", productoSchema);
