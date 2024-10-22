import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { ArticleEntity } from '../article/entities/article.entity';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity, UserEntity])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
