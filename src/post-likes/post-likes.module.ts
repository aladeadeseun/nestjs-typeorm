import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike } from '@/post-likes/entities/post-like.entity';
import { Post } from '@/posts/entities/post.entity';
import { NotificationsService } from '@/notifications/notifications.service';
import { Notification } from '@/notifications/entities/notification.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostLike, Notification, User])],
  providers: [PostLikesService, NotificationsService, PostLikesService],
  exports: [PostLikesService],
})
export class PostLikesModule {}
