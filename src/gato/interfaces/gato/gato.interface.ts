export interface Gato {
  id: string;
  nombre: string;
  edad: string;
  castrado: boolean;
  color: string;
  descripcion: string;
  reservado: boolean;
  personalidad: string[];
  numLikes: number;
  adoptado: boolean;
  imagen: string[];
  likedBy: string[];
  Adopciones: Adopcion[];
  //dueño: Usuario
}

export interface Adopcion {
  id: string;
  usuario: string;
  status: string;
  fecha: Date;
}
