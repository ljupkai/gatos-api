import { IsString, IsNotEmpty } from 'class-validator';

export class GatoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @IsNotEmpty()
  readonly edad: number;
  readonly castrado: boolean;
  @IsString()
  @IsNotEmpty()
  readonly color: string;
  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;
  readonly reservado: boolean;
  readonly personalidad: string[];
  readonly numLikes: number;
  readonly adoptado: boolean;
  //fotos: fotoAdopcion[];
  //usuarioID: Usuario
}
