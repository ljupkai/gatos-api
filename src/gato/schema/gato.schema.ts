import * as mongoose from 'mongoose';

const adopcionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  status: {
    type: String,
    enum: ['pending', 'reservado', 'rechazado'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const GatoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  edad: {
    type: String,
    // required: true,
    minlength: 5,
    trim: true,
  },
  castrado: {
    type: Boolean,
    // required: true,
  },
  color: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  reservado: {
    type: Boolean,
    // required: true,
  },
  personalidad: {
    type: [String],
    enum: ['solo', 'gatos', 'perros'],
  },
  numLikes: {
    type: Number,
  },
  adoptado: {
    type: Boolean,
  },
  imagen: {
    type: [String],
  },
  Adopciones: {
    type: [adopcionSchema],
  },
});
