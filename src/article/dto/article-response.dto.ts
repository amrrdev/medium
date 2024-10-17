import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class ArticleReponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  body: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserDto) // this is fucking important
  author: UserDto;
}
