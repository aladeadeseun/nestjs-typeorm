import { Module } from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';
import { NotificationsService } from '@/notifications/notifications.service';
import { Notification } from '@/notifications/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFollow, Notification])],
  providers: [UserFollowsService, NotificationsService],
  exports: [UserFollowsService],
})
export class UserFollowsModule {}
