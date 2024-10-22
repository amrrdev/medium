import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticleEntity } from '../article/entities/article.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserEntity } from '../users/entities/user.entity';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  private async findArticle(articleId: number) {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException(`There's no article with this id ${articleId}`);
    }
    return article;
  }

  async createComment(userId: number, createCommentDto: CreateCommentDto) {
    const article = await this.findArticle(createCommentDto.articleId);

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user: { id: userId },
      article,
    });

    return await this.commentRepository.save(comment);
  }

  async findCommentWithUser(commentId: number, userId: number, articleId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: { id: userId },
        article: { id: articleId },
      },
      relations: ['user', 'article'],
    });

    if (!comment)
      throw new NotFoundException(
        `Comment not found or you do not have permission to update it.`,
      );
    return comment;
  }

  async updateComment(userId: number, commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findCommentWithUser(
      commentId,
      userId,
      updateCommentDto.articleId,
    );
    comment.content = updateCommentDto.newContent;

    console.log(comment);

    return await this.commentRepository.save(comment);
  }

  async deleteComment(userId: number, commentId: number, deleteCommentDto: DeleteCommentDto) {
    const comment = await this.findCommentWithUser(
      commentId,
      userId,
      deleteCommentDto.articleId,
    );
    await this.commentRepository.delete(comment);
  }

  async findAllCommentsOnArticle(articleId: number) {
    const comments = await this.commentRepository.find({
      where: { article: { id: articleId } },
      relations: ['user', 'article'],
    });
    return comments;
  }
}
