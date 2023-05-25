import { ApiProperty } from "@nestjs/swagger";

/**
 * The Dto file contains the description of the client requests
 */
export class SignInDto {
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