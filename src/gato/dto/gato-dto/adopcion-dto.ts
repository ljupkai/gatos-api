import { IsString, IsNotEmpty, IsDate, IsMongoId } from 'class-validator';

export class AdopcionDto {
  @IsMongoId()
  readonly usuario: string;
  readonly status: string;
  //   @IsDate()
  readonly date: Date;
}
