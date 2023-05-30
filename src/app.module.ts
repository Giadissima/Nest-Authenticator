import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivateController } from './private/private.controller';
import { PrivateModule } from './private/private.module';
import configuration from './config/config'; // In this line I'm naming it "configuration"

@Module({
  // ? Configuration of the external modules (imported from libraries)
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [configuration],
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.getOrThrow('jwt').secret,
          signOptions: { expiresIn: config.getOrThrow('jwt').duration },
        };
      },
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOrThrow('mongoose'),
    }),
    AuthModule,
    PrivateModule,],
  controllers: [PrivateController],
})
export class AppModule {}
