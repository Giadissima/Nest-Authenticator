import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWTConfig } from 'src/config/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserAuth } from './user-auth';

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

  validate(payload: UserAuth): UserAuth {
    return new UserAuth(payload);
  }
}