/* eslint-disable prettier/prettier */

import { PostBody } from '@/posts/dto/post-body.dto';
import { Post } from '@/posts/entities/post.entity';
import { User } from '@/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
    ){}

    private async getPostToUpdate(postId: number, user: User){

        const post = await this.postsRepository.findOne({
            where:{id:postId},
            relations:{author:true},
            select:{
                id:true,
                author:{
                    id:true
                },
                content:true,
                createdAt:true,
                updatedAt:true
            }
        })

        //if old post cannot be found, throw not found error
        if(!post)
            throw new NotFoundException({message:"Post not found"});
        
        
        if(post.author.id !== user.id)
            throw new HttpException({message:"You are not authorized to perform action"}, HttpStatus.UNAUTHORIZED)

        return post
    }

    async fetchPost(){
        return {
            data: await this.postsRepository.find({relations:{author:true}})
        }
    }

    async createPost(user: User, postBody: PostBody){
        const post = new Post()

        Object.assign(post, postBody)

        post.author = user

        return {
            data: await this.postsRepository.save(post),
            message:"Post successfully created"
        }
    }

    async updatePost(user: User, postBody: PostBody, postId: number){
        //get old post
        let post = await this.getPostToUpdate(postId, user)

        Object.assign(post, postBody)

        post = await this.postsRepository.save(post)

        post.author = user

        return {
            message:"Post successfully updated",
            data:post
        }
    }

    async deletePost(user: User, postId:number){
        //get old post
        const post = await this.getPostToUpdate(postId, user)

        await this.postsRepository.delete(post.id)

        return {
            message:"Post successfully deleted.",
            data:post
        }
    }
}
