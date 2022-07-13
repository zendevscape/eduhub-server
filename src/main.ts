import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DatabaseService } from './common/services';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create Nest application.
  const app = await NestFactory.create(AppModule);

  // Get config service.
  const configService = app.get(ConfigService);

  // Get database service.
  const databaseService = app.get(DatabaseService);

  // Get application port config.
  const port = configService.get('PORT');

  // Enable shudown hooks.
  await databaseService.enableShutdownHooks(app);

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
