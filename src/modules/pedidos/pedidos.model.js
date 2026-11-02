
import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El cliente es obligatorio"]
    },

    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: [true, "El producto es obligatorio"]
    },

    cantidad: {
      type: Number,
      required: [true, "La cantidad es obligatoria"],
      min: [1, "La cantidad mínima es 1"],
      default: 1
    },

    // Precios guardados al realizar la compra.
    // Así no cambian si después cambia el catálogo.
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    costoEntrega: {
      type: Number,
      default: 0,
      min: 0
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    // Se completa cuando el administrador asigna la floristería.
    ofertaFloristeria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfertaFloristeria",
      default: null
    },

    costoFloristeria: {
      type: Number,
      default: null,
      min: 0
    },

    destinatario: {
      nombre: {
        type: String,
        required: [true, "El nombre del destinatario es obligatorio"],
        trim: true
      },
      telefono: {
        type: String,
        required: [true, "El teléfono del destinatario es obligatorio"],
        trim: true
      },
      mensajeTarjeta: {
        type: String,
        trim: true,
        maxlength: 300,
        default: ""
      }
    },

    entrega: {
      direccion: {
        type: String,
        required: [true, "La dirección de entrega es obligatoria"],
        trim: true
      },
      ciudad: {
        type: String,
        required: [true, "La ciudad es obligatoria"],
        trim: true
      },
      fechaProgramada: {
        type: Date,
        required: [true, "La fecha de entrega es obligatoria"]
      },
      tipo: {
        type: String,
        enum: ["inmediata", "programada"],
        required: true
      },
      instrucciones: {
        type: String,
        trim: true,
        default: ""
      }
    },

    estado: {
      type: String,
      enum: [
        "pendiente_asignacion",
        "pendiente_confirmacion_floristeria",
        "confirmado",
        "pendiente_pago",
        "pagado",
        "en_preparacion",
        "en_camino",
        "entregado",
        "cancelado"
      ],
      default: "pendiente_asignacion"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

pedidoSchema.index({ cliente: 1, createdAt: -1 });

export const Pedido = mongoose.model("Pedido", pedidoSchema);
