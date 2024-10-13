import { Body, Controller, Get, ParseIntPipe, Patch, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Serialize } from './decorators/serialize-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  profile(@ActiveUser('sub', ParseIntPipe) sub: number): Promise<UserEntity> {
    return this.usersService.profile(sub);
  }

  @Patch('profile')
  updateProfile(
    @ActiveUser('sub', ParseIntPipe) sub: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<UserEntity> {
    return this.usersService.updateProfile(sub, updateProfileDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
