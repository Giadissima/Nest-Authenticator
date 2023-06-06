import { Injectable, UnauthorizedException } from '@nestjs/common';

// TODO posso cambiare l'import?
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/auth/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationResponse } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   * function that allows users to login if username and password are correct.
   * @returns {AuthenticationResponse} jwt token string
   */
  async signIn(credentials: {
    username: string;
    password: string;
  }): Promise<AuthenticationResponse> {
    // ? password hashing
    credentials.password = await bcrypt.hash(
      credentials.password,
      this.configService.getOrThrow('bcrypt_salt'),
    );
    const user = await this.userModel
      .findOne(credentials)
      .orFail(new UnauthorizedException('Incorrect username or password'));
    const payload = { id: user._id, username: user.username };
    return { jwt: await this.jwtService.signAsync(payload) };
  }

  /**
   * function that allows users to login if username and password are correct
   * @return {string} "Success", otherwise an error is throw
   */
  async signUp(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    credentials.password = await bcrypt.hash(
      credentials.password,
      this.configService.getOrThrow('bcrypt_salt'),
    );
    new this.userModel({ ...credentials }).save();
    return "Success";
  }
}
