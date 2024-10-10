import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigration: ConfigType<typeof jwtConfig>,
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
      },
      {
        secret: this.jwtConfigration.secret,
        issuer: this.jwtConfigration.issuer,
        audience: this.jwtConfigration.audience,
        expiresIn: this.jwtConfigration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
