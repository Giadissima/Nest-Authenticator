import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserToken, UsersService } from '../users/users.service';

import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // TODO criptare
  async signIn(credentials: {username:string, password: string}): Promise<UserDocument> {
    /**
     * function that allows users to login if username and password are correct
     * @param {string} username
     * @param {string} password
     */
    return this.userModel.findOne(credentials).orFail(new UnauthorizedException('Incorrect username or password'));
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