import { IsString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import configFn from 'src/config/config'

// ? modo per importare e chiamare la funzione dentro a config
const userDto = configFn().userDto;
if(!userDto) throw new NotFoundError("CONFIG FILE NOT INITIALIZED")
/**
 * The Dto file contains the description of the client requests
 */
//TODO fixare l'errore che il config non prende i valori dal .env
// non li sta prendendo dal process.env
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