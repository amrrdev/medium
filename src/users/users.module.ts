import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ArticleEntity } from 'src/article/entities/article.entity';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ArticleEntity]), ArticleModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
