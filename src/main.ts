import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from './common/env.service';
import { HttpExceptionFilter } from './common/Exception-Filters/http-exception.filter';
import { ModelExceptionFilter } from './common/Exception-Filters/model-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = new EnvService().read();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter(), new ModelExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(env.APP_NAME || 'Quick NestJs Boilerplate for REST Service')
    .setDescription(env.APP_DESC || 'The Quickproject')
    .setVersion(env.APP_VER || '1.0')
    .addTag(env.APP_TAG || 'my project')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(env.APP_PORT);
  const app_url = await app.getUrl();
  
  console.log(`Application is running on: ${app_url}`);
  console.log(`Swagger Docs path: ${app_url}/api`);
}
bootstrap();
