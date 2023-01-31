import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'array-flat-polyfill';
import { join } from 'path';
import { AppModule } from './app.module';
import { configService } from './config.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require('morgan');

const { PORT } = configService.getAppConfig();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug'],
    cors: false,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', '..', 'client'));

  console.log('CLIENT_HOST', configService.getAppConfig().clientHost);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  });

  app.setGlobalPrefix('/api');

  app.use(logger('combined'));

  await app.listen(PORT);
}

bootstrap();
