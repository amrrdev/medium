import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @Expose()
  articleId: number;

  @IsNotEmpty()
  @Expose()
  content: string;
}
