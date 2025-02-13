import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * setup swagger app for api docs
 *
 * @param app
 */
export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Grocery Booking Service')
    .setDescription('Grocery Booking Backend NestJS Service')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Grocery Booking Service',
  });
}
