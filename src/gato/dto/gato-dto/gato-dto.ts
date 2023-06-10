import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsInt,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { AdopcionDto } from './adopcion-dto';

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
  @IsOptional()
  readonly likedBy: string[];
  //dueño: usuarioId
  //   @IsOptional()
  //   readonly adopcion: string;
  @IsOptional()
  readonly Adopciones: AdopcionDto[];
}
