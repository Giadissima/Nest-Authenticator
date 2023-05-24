import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import configFn from 'src/config/config'

// ? modo per importare e chiamare la funzione dentro a config
const jwtConstants = configFn().jwt;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      // TODO deprecated function, change it
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: { expiresIn:  jwtConstants.duration},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}