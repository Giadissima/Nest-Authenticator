import { IsString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { NotFoundError } from "rxjs";
import configFn from 'src/config/config'

// ? this line import config file without dependecy injection
const userDto = configFn().userDto;
if(!userDto) throw new NotFoundError("CONFIG FILE NOT INITIALIZED")

//TODO fixare l'errore che il config non prende i valori dal .env
/** The Dto file contains the description of the client requests and the server's responses*/
export class UserCredentialsDto {
  @IsString()
  @Length(userDto.usernameMinLenght, userDto.usernameMaxLenght)
  @ApiProperty({
    description: 'username',
    example: 'john'
  })
  username: string;

  @IsString()
  @Length(userDto.passwordMinLenght, userDto.passwordMaxLenght)
  @ApiProperty({
    description: 'password',
    example: 'changeme'
  })
  password: string;
}

export class AuthenticationResponse {
  @ApiProperty({
    description: "Jwt token"
  })
  jwt: string
} 