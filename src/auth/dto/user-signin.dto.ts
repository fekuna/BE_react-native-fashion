import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSigninDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
