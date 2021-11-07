import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create Nest application.
  const app = await NestFactory.create(AppModule);

  // Get config service.
  const configService = app.get(ConfigService);

  // Get application port config.
  const port = configService.get('PORT');

  // Enable CORS
  app.enableCors();

  // Enable HTTP security headers
  app.use(helmet());

  // Enable compression
  app.use(compression());

  app.setGlobalPrefix('api/v1');

  app.listen(port);
}

bootstrap();
