import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponse, UserCredentialsDto } from './auth.dto';
import { Public } from './auth.guard';
import { User } from './user.metadata';
import { UserAuth } from './user-auth';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOkResponse({ description: "Returns the user object found"})
  @ApiBody({ required: true, type: UserCredentialsDto })
  @Post('sign-in')
  signIn(@Body() data: UserCredentialsDto): Promise<AuthenticationResponse> {
    // ? "/sign-in" route
    return this.authService.signIn(data);
  }

  @Public()
  @ApiNotFoundResponse({ description: "Bad credentials"})
  @ApiOkResponse({ description: "Returns the user object created", type: String}) // TODO va bene il type?
  @ApiBody({ required: true, type: UserCredentialsDto })
  @Post('sign-up')
  signUp(@Body() data: UserCredentialsDto): Promise<AuthenticationResponse> {
    // ? "/sign-up" route
    return this.authService.signUp(data);
  }

  // TODO come funziona questa funzione? mi sembra che non stia davvero facendo il logout
  @ApiBearerAuth()
  @Delete('sign-out')
  signOut(): { message: string } {
    return { message: 'goodbye!' };
  }

  // TODO non mi fa nulla
  @Get('/me')
  me(@User() user: UserAuth): UserAuth {
    return user;
  }

  @Public()
  // @Post(':email/recover-password')
  recoverPassword(@Param('email') email: string): void {
    // insert here you're recover password method
  }
}
