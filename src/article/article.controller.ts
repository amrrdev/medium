import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { Serialize } from '../users/decorators/serialize-user.decorator';
import { ArticleReponseDto } from './dto/article-response.dto';
import { Auth } from '../auth/authentication/decorators/auth.decorator';
import { AuthType } from '../auth/authentication/enums/auth-type.enum';
import { UpdateArticelDto } from './dto/update-article.dto';

@Controller('articles')
@Serialize(ArticleReponseDto)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  createArticle(@ActiveUser('sub') id: number, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto, id);
  }

  @Auth(AuthType.NONE)
  @Get()
  getArticles() {
    return this.articleService.getArticles();
  }

  @Auth(AuthType.NONE)
  @Get(':id')
  getArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleById(id);
  }

  @Patch(':id')
  updateArticle(
    @ActiveUser('sub') sub: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticelDto: UpdateArticelDto,
  ) {
    return this.articleService.updateArticle(sub, id, updateArticelDto);
  }

  @Delete(':id')
  deleteArticle(@ActiveUser('sub') sub: number, @Param('id', ParseIntPipe) articleId: number) {
    return this.articleService.deleteArticle(sub, articleId);
  }
}
