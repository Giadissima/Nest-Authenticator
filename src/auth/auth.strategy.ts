import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserAuth, UserAuth } from './user-auth';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWTConfig } from 'src/config/configuration';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JwtStrategy') {
  constructor(confService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: (confService.get('jwt') as JWTConfig).ignoreExpiration,
      secretOrKey: (confService.get('jwt') as JWTConfig).secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IUserAuth) {
    return new UserAuth(payload);
  }
}