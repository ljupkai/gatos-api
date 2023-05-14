import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class GatoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  // @IsNotEmpty()
  @IsString()
  readonly edad: string;
  @IsBoolean()
  readonly castrado: boolean;
  @IsString()
  // @IsNotEmpty()
  readonly color: string;
  // @IsNotEmpty()
  @IsString()
  readonly descripcion: string;
  @IsBoolean()
  readonly reservado: boolean;
  readonly personalidad: string[];
  readonly numLikes: number;
  @IsBoolean()
  readonly adoptado: boolean;
  @IsOptional()
  readonly imagen: string[];
  //dueño: usuarioId
  //   @IsOptional()
  //   readonly adopcion: string;
}
