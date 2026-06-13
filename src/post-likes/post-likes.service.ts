/* eslint-disable prettier/prettier */
import { NotificationType } from '@/notifications/enum/notification-type.enum';
import { NotificationsService } from '@/notifications/notifications.service';
import { PostLike } from '@/post-likes/entities/post-like.entity';
import { Post } from '@/posts/entities/post.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostLikesService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        @InjectRepository(PostLike)
        private readonly postLikesRepository: Repository<PostLike>,

        private notificationsService: NotificationsService
    ){}

    async toggleLikePost(user: User, postId: number){

        const post = await this.postsRepository.findOne({
            where:{id:postId},
            relations:{author:true},
            select:{
                id:true, 
                author:{id:true}
            }
        })
        
        if(!post){
            throw new NotFoundException("The post cannot be found")
        }

        const alreadyLike = await this.postLikesRepository.findOne({
            where:{
                user:{ id:user.id },
                post:{ id: post.id}
            }
        })
        
        if(alreadyLike){
            //console.log(alreadyFollow)
            await this.postLikesRepository.delete(alreadyLike.id)
            await this.notificationsService.createNotification(
                user, post.author.id, NotificationType.UNLIKE, postId
            )
            return {message:"You have successfully unliked post"}
        }
        else{

            const postLike = new PostLike()
            postLike.user = user
            postLike.post = post
            await this.postLikesRepository.save(postLike)
            await this.notificationsService.createNotification(
                user, post.author.id, NotificationType.LIKE, postId
            )

            return {message:"You have successfully liked post."}
        }
    }
}
