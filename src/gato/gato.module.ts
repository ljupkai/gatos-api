import { Module } from '@nestjs/common';
import { GatoController } from './gato.controller';
import { GatoService } from './gato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GatoSchema } from './schema/gato.schema';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gato', schema: GatoSchema }]),
    UsuarioModule,
  ],
  controllers: [GatoController],
  providers: [GatoService],
  exports: [GatoService],
})
export class GatoModule {}
