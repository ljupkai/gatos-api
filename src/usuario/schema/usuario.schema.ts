import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  correo: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trime: true,
    minlength: 3,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});