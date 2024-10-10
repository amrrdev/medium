import { PickType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
