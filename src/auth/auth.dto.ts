import { ApiProperty } from "@nestjs/swagger";

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