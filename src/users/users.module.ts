/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Profile } from '@/users/entities/profile.entity';
import { UserFollowsService } from '@/user-follows/user-follows.service';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';
import { NotificationsService } from '@/notifications/notifications.service';
import { Notification } from '@/notifications/entities/notification.entity';
import EventsService from '@/events/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, UserFollow, Notification])],
  controllers: [UsersController],
  providers: [UsersService, UserFollowsService, NotificationsService, EventsService],
  exports: [UsersService],
})
export class UsersModule {}
