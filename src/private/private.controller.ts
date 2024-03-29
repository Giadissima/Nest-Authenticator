import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
@ApiBearerAuth()
export class PrivateController {
  @ApiTags('Private')
  @UseGuards(AuthGuard) // decorator needed to make the route private, and only accessible via authentication
  @Get('private-route')
  /* This function allows the user to see a message only if client token is valid (see AuthGuard) */
  privateRoute():string  {
    return "you have the right access to see this message"
  }
}
