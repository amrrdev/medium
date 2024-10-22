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
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { DeleteCommentDto } from '../comment/dto/delete-comment.dto';
import { CommentDto } from '../comment/dto/comment.dto';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @Serialize(ArticleReponseDto)
  createArticle(@ActiveUser('sub') id: number, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.createArticle(createArticleDto, id);
  }

  @Auth(AuthType.NONE)
  @Get()
  @Serialize(ArticleReponseDto)
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get('me')
  @Serialize(ArticleReponseDto)
  getMyArticles(@ActiveUser('sub') sub: number) {
    return this.articleService.getMyArticles(sub);
  }

  @Auth(AuthType.NONE)
  @Get(':id')
  @Serialize(ArticleReponseDto)
  getArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.getArticleById(id);
  }

  @Patch(':id')
  @Serialize(ArticleReponseDto)
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

  @Auth(AuthType.NONE)
  @Get('/:id/comments')
  @Serialize(CommentDto)
  findAllComments(@Param('id', ParseIntPipe) articleId: number) {
    return this.commentService.findAllCommentsOnArticle(articleId);
  }

  @Post('/comment')
  createComment(
    @ActiveUser('sub', ParseIntPipe) sub: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(sub, createCommentDto);
  }

  @Patch('/comment/:id')
  @Serialize(CreateCommentDto)
  updateComment(
    @ActiveUser('sub', ParseIntPipe) sub: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(sub, commentId, updateCommentDto);
  }

  @Delete('/comment/:id')
  @Serialize(CommentDto)
  // @Serialize(ArticleReponseDto)
  DeleteCommentDto(
    @ActiveUser('sub', ParseIntPipe) sub: number,
    @Param('id', ParseIntPipe) commentId: number,
    @Body() deleteCommentDto: DeleteCommentDto,
  ) {
    return this.commentService.deleteComment(sub, commentId, deleteCommentDto);
  }
}
