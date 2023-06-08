import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatoModule } from './gato/gato.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
// import { RolesGuard } from './security/roles.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    GatoModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/gatos'),
    UsuarioModule,
    AuthModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    //   serveRoot: '/public/',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
