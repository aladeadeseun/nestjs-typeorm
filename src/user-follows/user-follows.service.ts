/* eslint-disable prettier/prettier */
import { NotificationType } from '@/notifications/enum/notification-type.enum';
import { NotificationsService } from '@/notifications/notifications.service';
import { UserFollow } from '@/user-follows/entities/user-follow.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserFollowsService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(UserFollow)
        private readonly userFollowsRepository: Repository<UserFollow>,

        private readonly notificationService:NotificationsService
    ){}

    async toggleFollow(followingId: number, user: User){
        const following = await this.usersRepository.findOneBy({id:followingId})

        if(!following){
            throw new NotFoundException("The user you are trying follow cannot be found")
        }

        const alreadyFollow = await this.userFollowsRepository.findOne({
            where:{
                follower:{ id:user.id },
                following:{ id: following.id}
            }
        })
        
        if(alreadyFollow){
            //console.log(alreadyFollow)
            await this.userFollowsRepository.delete(alreadyFollow.id)
            
            await this.notificationService.createNotification(
                user, followingId, NotificationType.UNFOLLOW, followingId
            )

            return {message:"You have successfully unfollow " + following.username}
        }
        else{
            const userFollow = new UserFollow()
            userFollow.follower = user
            userFollow.following = following
            
            await this.userFollowsRepository.save(userFollow)
            
            await this.notificationService.createNotification(
                user, followingId, NotificationType.FOLLOW, followingId
            )

            return {message:"You have successfully follow " + following.username}
        }
    }
}
