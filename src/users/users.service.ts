import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity | UserEntity[]> {
    return await this.userRepository.find();
  }

  async profile(sub: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: sub });
  }

  async updateProfile(sub: number, updateProfileDto: UpdateProfileDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: sub });
    const updatedUser = Object.assign(user, updateProfileDto);
    console.log(updateProfileDto);
    return await this.userRepository.save(updatedUser);
  }
}
