import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrivateController } from './private/private.controller';
import { PrivateModule } from './private/private.module';
import { UsersModule } from './users/users.module';
import configuration from './config/config'; // il nome configuration gliel'ho dato in questo momento, posso chiamarlo come voglio

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
    AuthModule,
    UsersModule,
    PrivateModule,],
  controllers: [PrivateController],
})
export class AppModule {}
