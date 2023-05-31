import { Injectable, UnauthorizedException } from '@nestjs/common';

// TODO posso cambiare l'import?
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationResponse } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JWTConfig } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(Auth.name) private userModel: Model<Auth>,
    ) {}
  private readonly jwtConfig: JWTConfig = this.configService.getOrThrow('jwt');

  async signIn(credentials: {
    username: string;
    password: string;
  }): Promise<AuthenticationResponse> {
    /**
     * function that allows users to login if username and password are correct.
     * @param {string} username
     * @param {string} password
     */
    // ? password hashing
    credentials.password = await bcrypt.hash(
      credentials.password,
      this.configService.getOrThrow('bcrypt_salt'),
    );
    const user = await this.userModel
      .findOne(credentials)
      .orFail(new UnauthorizedException('Incorrect username or password'));
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const payload = { _id: user._id, username: user.username };
    return {
      payload: this.jwtService.sign(payload, {
        expiresIn: this.jwtConfig.duration,
        secret: this.jwtConfig.secret,
      }),
    };
  }

  async signUp(credentials: {
    username: string;
    password: string;
  }): Promise<AuthenticationResponse> {
    /**
     * function that allows users to login if username and password are correct
     * @param {string} username
     * @param {string} password
     * @return {string} "Success"
     */
    credentials.password = await bcrypt.hash(
      credentials.password,
      this.configService.getOrThrow('bcrypt_salt'),
    );
    const user = await new this.userModel({ ...credentials }).save();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const payload = { _id: user._id, username: user.username };
    return {
      payload: this.jwtService.sign(payload, {
        expiresIn: this.jwtConfig.duration,
        secret: this.jwtConfig.secret,
      }),
    };
  }
}
