import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponse, UserCredentialsDto } from './auth.dto';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: "Returns the user object found"})
  @Post('sign-in')
  /* /sign-in route*/
  signIn(@Body() data: UserCredentialsDto): Promise<AuthenticationResponse> {
    return this.authService.signIn(data);
  }

  @ApiNotFoundResponse({ description: "Bad credentials"})
  @ApiOkResponse({ description: "Returns the user object created"})
  @Post('sign-up')
  /* /sign-up route */
  signUp(@Body() data: UserCredentialsDto): Promise<string> {
    return this.authService.signUp(data);
  }
}
