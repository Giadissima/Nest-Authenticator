import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserToken, UsersService } from '../users/users.service';

import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationResponse } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // TODO criptare
  async signIn(credentials: {username:string, password: string}): Promise<AuthenticationResponse> {
    /**
     * function that allows users to login if username and password are correct
     * @param {string} username
     * @param {string} password
     */
    const user = await this.userModel.findOne(credentials).orFail(new UnauthorizedException('Incorrect username or password'));
    const payload = { id: user._id, username: user.username };
    return {jwt: await this.jwtService.signAsync(payload)};
  }

  // TODO typeorm
  async signUp(credentials: {username: string, password: string}): Promise<UserDocument> {
    /**
     * function that allows users to login if username and password are correct
     * @param {string} username
     * @param {string} password
     */
    return new this.userModel({...credentials}).save();
  }
}