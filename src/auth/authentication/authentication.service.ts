import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { pgUniqueViolationErrorCode } from '../auth.constants';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
  ) {}

  async singup(signUpDto: SignUpDto) {
    try {
      const user = this.userRepository.create(signUpDto);
      user.password = await this.hashingService.hash(user.password);
      return await this.userRepository.save(user);
    } catch (err) {
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('email already used');
      }
      throw err;
    }
  }

  async signin(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: signInDto.email });
    if (!user || !(await this.hashingService.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // TODO: generate JWT
    return true;
  }
}
