import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { pgUniqueViolationErrorCode } from '../auth.constants';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { MailService } from 'src/integrations/mail/mail.service';
import { MailOptionsInterface } from 'src/integrations/mail/interfaces/mail.interface';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
    private readonly mailService: MailService,
  ) {}

  async singup(signUpDto: SignUpDto) {
    try {
      const user = this.userRepository.create(signUpDto);
      user.password = await this.hashingService.hash(user.password);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException(
          'Looks like that email is already in use. Please try a different one.',
        );
      }
      throw err;
    }
  }

  async signin(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (!user || !(await this.hashingService.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException(
        'Oops! We couldn’t log you in. Please check your email and password, and try again.',
      );
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      } satisfies ActiveUserData,
      {
        secret: this.jwtConfigration.secret,
        issuer: this.jwtConfigration.issuer,
        audience: this.jwtConfigration.audience,
        expiresIn: this.jwtConfigration.accessTokenTtl,
      },
    );
    return { accessToken };
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.userRepository.findOneBy({ email: forgetPasswordDto.email });
    if (!user) {
      throw new NotFoundException("There's not user with this email: بطل عولقة");
    }
    const token = this.mailService.generateResetToken(forgetPasswordDto);
    const otp = this.mailService.generateOTP(forgetPasswordDto);

    const mailOptions = {
      to: user.email,
      subject: 'Reset Your Password',
      text: `Hello ${user.username},
      We received a request to reset your password. If you did not make this request, please ignore this email.
      To reset your password, send http post request with the otp below for reset-password resource:
      ${token} 
      THEN send this otp: ${otp} in the body of the request
      If you have any questions, feel free to contact our support team.
      
      Best regards,
      Amr`,
    } satisfies MailOptionsInterface;

    await this.mailService.sendEmail(mailOptions);
    return 'mail sent';
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const verifiedToken = this.mailService.verifyToken(resetPasswordDto.email, token);

    const verifiedOtp = this.mailService.verifyOTP(
      resetPasswordDto.email,
      resetPasswordDto.otp,
    );
    console.log(verifiedOtp, verifiedToken);

    if (!verifiedToken || !verifiedOtp) {
      throw new BadRequestException(
        'invalid token or otp, please send request to forget-password, and try again',
      );
    }

    const user = await this.userRepository.findOneBy({ email: resetPasswordDto.email });

    if (!user) {
      throw new BadRequestException('user is deleted');
    }

    user.password = await this.hashingService.hash(resetPasswordDto.password);
    return await this.userRepository.save(user);
  }
}
