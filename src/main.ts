/* eslint-disable @typescript-eslint/no-var-requires */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

const { version } = require('../package.json');


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const isProductionEnv = configService.getOrThrow('environment') === 'production';

   /* configuration and Swagger activation*/ 
   if (configService.getOrThrow<boolean>('enableSwagger')) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Nest-Middlewares-with-Swagger')
      .setVersion(version)
      if(isProductionEnv) {
        config.addServer('/api');
      }
    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup(`/swagger`, app, document, {
      customSiteTitle: 'Nest-Middlewares-with-Swagger',
      swaggerOptions: {
        persistAuthorization: true,
      },
      customCss: `
          .swagger-ui .topbar { display: none; }
          .swagger-ui .info .title::before { display: inline-block; width: 226px; height: 65px; margin: -50px 0; position: relative; content: ''; vertical-align: middle; background-size: contain; background-repeat: no-repeat; background-position: left center; background-image: url(https://log-in.benetti.3logic.it/assets/img/logo.png); }
          `,
    });
  }

  await app.listen(3000);
}
bootstrap();
