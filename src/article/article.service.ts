import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateArticelDto } from './dto/update-article.dto';
import { CommentEntity } from '../comment/entities/comment.entity';
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly commentService: CommentService,
  ) {}

  async getArticles() {
    return await this.articleRepository.find({ relations: ['author'] });
  }

  async getMyArticles(userId: number) {
    const articles = await this.articleRepository.find({
      where: { author: { id: userId } },
      relations: ['author'],
    });

    return articles;
  }

  async createArticle(createArticleDto: CreateArticleDto, userId: number) {
    const author = await this.userRepository.findOneBy({ id: userId });
    const article = this.articleRepository.create({
      ...createArticleDto,
      author,
    });
    return await this.articleRepository.save(article);
  }

  async getArticleById(articleId: number) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['author'],
    });
    if (!article) {
      throw new NotFoundException(`There's not article with that id ${articleId}`);
    }
    return article;
  }

  async updateArticle(userId: number, articleId: number, updateArticelDto: UpdateArticelDto) {
    const article = await this.findArticleWithSpecificUser(userId, articleId);

    Object.assign(article, updateArticelDto);
    return await this.articleRepository.save(article);
  }

  async deleteArticle(userId: number, articleId: number) {
    const article = await this.findArticleWithSpecificUser(userId, articleId);
    await this.articleRepository.delete({ id: article.id });
  }

  private async findArticleWithSpecificUser(userId: number, articleId: number) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId, author: { id: userId } },
      relations: ['author'],
    });

    if (!article) {
      throw new BadRequestException(
        `Article with ID ${articleId} does not exist or you do not have permission to edit it.`,
      );
    }
    return article;
  }
}
