import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserToken, UsersService } from '../users/users.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username:string, pass: string): Promise<UserToken> {
    /**
     * function that allows users to login if username and password are correct
     * @param {string} username
     * @param {string} password
     */
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}