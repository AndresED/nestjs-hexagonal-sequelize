import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { DateTime } from 'luxon';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { AppExceptionFilter } from './shared/filters/app-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORTSERVER');
  const appVersion = configService.get<string>('APP_VERSION');
  app.enableCors();
  app.use(json({ limit: '300mb' }));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();
  app.use(json({ limit: '300mb' }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const d = DateTime.local();
  const timezone = d.zoneName;
  const stage = process.env.NODE_ENV || 'development';
  if (stage === 'development') {
    const configSwagger = new DocumentBuilder()
      .setTitle('CrediPremium Api')
      .setVersion(appVersion)
      .addBearerAuth(
        {
          description: `Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('docs', app, document);
    SwaggerModule.setup('/', app, document);
  }
  await app.listen(port, '0.0.0.0', async () => {
    Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
    Logger.log('Mapped {/docs, GET} Swagger api route', 'RouterExplorer');
    Logger.log(`Enviroment running at ${stage}`);
    Logger.log(`🚀  Server is running at ${await app.getUrl()}`);
    Logger.log(`Timezone:  ${timezone}`);
    Logger.log(`Version:  ${appVersion}`);
  });
}
bootstrap();
