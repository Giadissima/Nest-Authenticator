import { Controller, Get, UseMiddleware } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UserMiddleware } from './user.middleware';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @UseMiddleware(UserMiddleware)
  getUser(): string {
    return this.userService.getUser();
  }
}
