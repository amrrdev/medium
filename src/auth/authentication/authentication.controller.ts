import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Serialize } from 'src/users/decorators/serialize-user.decorator';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
@Auth(AuthType.BEARER)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Auth(AuthType.NONE)
  @Post('sign-up')
  @Serialize(UserDto)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.singup(signUpDto);
  }

  @Auth(AuthType.NONE)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signin(@Body() signInDto: SignInDto) {
    return this.authenticationService.signin(signInDto);
  }

  @Auth(AuthType.NONE)
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    console.log(`i'am here controller`);
    return this.authenticationService.forgetPassword(forgetPasswordDto);
  }

  @Auth(AuthType.NONE)
  @Post('reset-password/:token')
  resetPasseord(@Body() resetPasseordDto: ResetPasswordDto, @Param('token') token: string) {
    return this.authenticationService.resetPassword(token, resetPasseordDto);
  }
}
