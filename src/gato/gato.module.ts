import { Module } from '@nestjs/common';
import { GatoController } from './gato.controller';
import { GatoService } from './gato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatoSchema } from './schema/gato.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Gato', schema: GatoSchema }])],
  controllers: [GatoController],
  providers: [GatoService],
})
export class GatoModule {}
