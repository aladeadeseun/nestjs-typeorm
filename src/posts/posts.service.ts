/* eslint-disable prettier/prettier */

import { CreatePost } from '@/posts/dto/create-post.dto';
import { Post } from '@/posts/entities/post.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly usersRepository: Repository<Post>,
    ){}

    async createPost(user: User, postBody: CreatePost){
        const post = new Post()

        Object.assign(post, postBody)

        post.author = user

        return {
            data: await this.usersRepository.save(post),
            message:"Post successfully created"
        }
    }
}
