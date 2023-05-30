import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponse, UserCredentialsDto } from './auth.dto';
import { UserDocument } from 'src/auth/auth.schema';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: "Returns the user object found"})
  @Post('sign-in')
  signIn(@Body() data: UserCredentialsDto): Promise<AuthenticationResponse> {
    // ? "/sign-in" route
    return this.authService.signIn(data);
  }

  @ApiNotFoundResponse({ description: "Bad credentials"})
  @ApiOkResponse({ description: "Returns the user object created"})
  @Post('sign-up')
  signUp(@Body() data: UserCredentialsDto): Promise<UserDocument> {
    // ? "/sign-up" route
    return this.authService.signUp(data);
  }
}
