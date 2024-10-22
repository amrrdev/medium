import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticelDto extends PartialType(CreateArticleDto) {}
