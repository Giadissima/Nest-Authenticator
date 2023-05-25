import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
@ApiBearerAuth()
export class PrivateController {
  @ApiTags('private')
  @UseGuards(AuthGuard)
  @Get('private-route')
  privateRoute():string  {
    return "you have right access to see this message"
  }
}
