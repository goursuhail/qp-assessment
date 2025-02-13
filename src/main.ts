import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { setupSwagger } from './swagger';
import { AdminService } from './modules/admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
      logger: ['error', 'warn', 'log'],
    },
  );
  const configService = app.get(ConfigService);
  const adminService = app.get(AdminService);
  app.use(
    bodyParser.json({
      limit: '5mb',
    }),
  );
  app.enableShutdownHooks(); // Starts listening for shutdown hooks
  app.setGlobalPrefix(configService.get('API_PREFIX'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true,
      transform: true,
      // dismissDefaultMessages: false,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Create the default  Admin for team
  adminService.createAdmin();

  if (['development', 'staging'].includes(configService.get('NODE_ENV'))) {
    setupSwagger(app);
  }

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log(
    `Grocery Booking Application running at port ${configService.get('PORT')}`,
  );
}
bootstrap();
