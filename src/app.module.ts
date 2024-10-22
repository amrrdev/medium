import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './integrations/mail/mail.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        database: configService.get<string>('DB_DATABASE'),
        password: configService.get<string>('DB_PASSWORD'),
        autoLoadEntities: true,
      }),
    }),
    TagModule,
    UsersModule,
    AuthModule,
    MailModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
