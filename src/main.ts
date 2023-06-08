import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Gatos')
    .setDescription('Gatos api')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useStaticAssets(join(__dirname, '..', 'public', 'uploads'), {
  //   prefix: '/public',
  // });
  app.use(json({ limit: '5mb' }));

  app.useStaticAssets(join(__dirname, '..', 'node_modules/bootstrap/dist'));

  await app.listen(3000);
}
bootstrap();
