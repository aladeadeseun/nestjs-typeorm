import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Profile } from '@/users/entities/profile.entity';
import { UserFollowsService } from '@/user-follows/user-follows.service';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, UserFollow])],
  controllers: [UsersController],
  providers: [UsersService, UserFollowsService],
  exports: [UsersService],
})
export class UsersModule {}
