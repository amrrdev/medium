import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';
import { ArticleReponseDto } from '../../article/dto/article-response.dto';

export class CommentDto {
  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => ArticleReponseDto)
  article: ArticleReponseDto;
}
