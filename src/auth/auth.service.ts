import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // TODO provare a criptare con bcrypt
  async signIn(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}