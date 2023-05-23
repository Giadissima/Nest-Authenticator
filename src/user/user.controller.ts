import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getUser(): string {
    return this.userService.getUser();
  }
}
