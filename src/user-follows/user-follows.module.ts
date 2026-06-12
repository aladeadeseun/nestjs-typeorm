import { Module } from '@nestjs/common';
import { UserFollowsService } from './user-follows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFollow])],
  providers: [UserFollowsService],
  exports: [UserFollowsService],
})
export class UserFollowsModule {}
