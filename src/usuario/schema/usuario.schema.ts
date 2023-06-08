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
  roles: {
    type: [String],
  },
  favoritos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gato',
    },
  ],
  imagenes: {
    type: [String],
  },
  nombreCompleto: {
    type: String,
    minlength: 6,
    trim: true,
  },
  direccion: {
    type: String,
    minlength: 6,
    trim: true,
  },
  telefono: {
    type: Number,
    min: [9, 'Pocos números'],
  },
  infoMudanza: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoPorque: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoFamilia: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoCostes: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoAbandonar: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoMovimiento: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoProteccion: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoExperiencia: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoProblemas: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoMascotasActuales: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoMascotasAnteriores: {
    type: String,
    minlength: 20,
    trim: true,
  },
  infoVeterinario: {
    type: String,
    minlength: 20,
    trim: true,
  },
});
