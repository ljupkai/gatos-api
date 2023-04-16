import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatoModule } from './gato/gato.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GatoModule, MongooseModule.forRoot('mongodb://127.0.0.1/gatos')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
