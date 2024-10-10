import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.singup(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInDto: SignInDto) {
    return this.authenticationService.signin(signInDto);
  }
}
