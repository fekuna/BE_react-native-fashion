import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  hashPassword: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}
