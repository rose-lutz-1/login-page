import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}