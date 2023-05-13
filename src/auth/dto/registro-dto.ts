import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import * as crypto from 'crypto';
// import { IsUserAlreadyExist } from '../validators/user-exists.validator';

export class RegistroDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsEmail()
  @IsNotEmpty()
  //   @IsUserAlreadyExist({
  //     message: 'Email $value is already present in the database',
  //   })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((p) =>
    p.value && typeof p.value === 'string'
      ? crypto.createHash('sha256').update(p.value, 'utf-8').digest('base64')
      : p.value,
  )
  password: string;
}
