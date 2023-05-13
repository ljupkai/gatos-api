import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import * as crypto from 'crypto';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform((p) =>
    p.value && typeof p.value === 'string'
      ? crypto.createHash('sha256').update(p.value, 'utf-8').digest('base64')
      : p.value,
  )
  readonly password: string;
}
