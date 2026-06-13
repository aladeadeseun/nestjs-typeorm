/* eslint-disable prettier/prettier */

import { CreateComment } from '@/comments/dto/create-comment.dto';
import { UpdateComment } from '@/comments/dto/update-comment.dto';
import { Comment } from '@/comments/entities/comment.entity';
import { NotificationType } from '@/notifications/enum/notification-type.enum';
import { NotificationsService } from '@/notifications/notifications.service';
import { Post } from '@/posts/entities/post.entity';
import { User } from '@/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        private notificationService:NotificationsService
    ){}

    private async getCommentToUpdate(commentId: number, user: User){
    
        const comment = await this.commentsRepository.findOne({
            where:{id:commentId},
            relations:{author:true},
            select:{
                id:true,
                author:{
                    id:true
                },
                post:{
                    id:true
                },
                content:true,
                createdAt:true,
                updatedAt:true,
            }
        })

        //if old post cannot be found, throw not found error
        if(!comment)
            throw new NotFoundException({message:"Comment not found"});
        
        
        if(comment.author.id !== user.id)
            throw new HttpException({message:"You are not authorized to perform action"}, HttpStatus.UNAUTHORIZED)

        return comment
    }

    async create({postId, content}: CreateComment, user:User){
        //first get post by post id
        const post = await this.postsRepository.findOne({
            where:{id:postId},
            select:{id:true, author:{id:true}}, relations:{author:true}
        })
        if(!post)
            throw new NotFoundException({message:"Post cannot be found."})

        const comment = new Comment()

        Object.assign(comment, {content})

        comment.post = post
        comment.author =user

        const createdComment = await this.commentsRepository.save(comment)

        //add the notification but don't wait for response, this should be added to job queue
        //to be added late
        try{
            await this.notificationService.createNotification(
                user, post.author.id, NotificationType.COMMENT, createdComment.id
            )
        }
        // eslint-disable-next-line no-empty
        catch{}
        
        return {
            message:"Comment created successfully",
            data:createdComment
        }
    }

    async updateComment(updateComment: UpdateComment, user:User, commentId: number){
        //first get post by post id
        let comment = await this.getCommentToUpdate(commentId, user)

        Object.assign(comment, updateComment)

        comment = await this.commentsRepository.save(comment)

        comment.author = user

        return {
            message:"Comment successfully updated",
            data:comment
        }
    }

    async deleteComment(user: User, commentId:number){
        //get old post
        const comment = await this.getCommentToUpdate(commentId, user)

        await this.commentsRepository.delete(comment.id)

        return {
            message:"Post successfully deleted.",
            data:comment
        }
    }
}
