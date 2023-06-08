export class UsuarioDto {
  readonly nombre: string;
  readonly correo: string;
  readonly roles: string[];
  readonly favoritos: string[];
  readonly imagenes: string[];
  readonly me?: boolean;
}

export class EncuestaDto {
  readonly nombreCompleto: string;
  readonly direccion: string;
  readonly telefono: number;
  readonly infoMudanza: string;
  readonly infoPorque: string;
  readonly infoFamilia: string;
  readonly infoCostes: string;
  readonly infoAbandonar: string;
  readonly infoMovimiento: string;
  readonly infoProteccion: string;
  readonly infoExperiencia: string;
  readonly infoProblemas: string;
  readonly infoMascotasActuales: string;
  readonly infoMascotasAnteriores: string;
  readonly infoVeterinario: string;
}
