import { Module } from '@nestjs/common';
import { GatoController } from './gato.controller';
import { GatoService } from './gato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatoSchema } from './schema/gato.schema';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  imports: [
    CommonsModule,
    MongooseModule.forFeature([{ name: 'Gato', schema: GatoSchema }]),
  ],
  controllers: [GatoController],
  providers: [GatoService],
})
export class GatoModule {}
