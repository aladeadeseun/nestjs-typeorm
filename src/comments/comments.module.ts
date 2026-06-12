import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/comments/entities/comment.entity';
import { Post } from '@/posts/entities/post.entity';
import { Notification } from '@/notifications/entities/notification.entity';
import { NotificationsService } from '@/notifications/notifications.service';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Notification, User])],
  controllers: [CommentsController],
  providers: [CommentsService, NotificationsService],
})
export class CommentsModule {}
