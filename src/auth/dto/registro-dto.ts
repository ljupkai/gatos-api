import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegistroDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsEmail()
  @IsNotEmpty()
  readonly correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  roles: string[];

  favoritos: string[];
  imagenes: string[];
}
