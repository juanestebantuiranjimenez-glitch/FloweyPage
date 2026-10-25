
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: 2
    },

    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El correo no es válido"]
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: 8,
      select: false
    },

    rol: {
      type: String,
      enum: ["cliente", "administrador"],
      default: "cliente"
    },

    activo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Usuario = mongoose.model("Usuario", usuarioSchema);
