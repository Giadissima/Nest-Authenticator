import { ApiProperty } from "@nestjs/swagger";

/**
 * The Dto file contains the description of the client requests
 */
// TODO aggiungere validazione
export class UserCredentialsDto {
  @ApiProperty({
    description: 'username',
    example: 'john'
  })
  username: string;

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