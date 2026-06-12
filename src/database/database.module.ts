import { Comment } from '@/comments/entities/comment.entity';
import { Post } from '@/posts/entities/post.entity';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';
import { Profile } from '@/users/entities/profile.entity';
import { User } from '@/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        entities: [User, Profile, Post, Comment, UserFollow],
        //autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
