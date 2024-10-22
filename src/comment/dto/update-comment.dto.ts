import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @IsInt()
  @Expose()
  articleId: number;

  @IsNotEmpty()
  @Expose()
  newContent: string;
}
