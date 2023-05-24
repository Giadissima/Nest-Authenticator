import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class PrivateController {
  @UseGuards(AuthGuard)
  @Get('private-route')
  privateRoute():string  {
    return "you have right access to see this message"
  }
}
