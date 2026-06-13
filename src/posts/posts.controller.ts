/* eslint-disable prettier/prettier */

import { CurrentUser } from '@/auth/decorator/current-user.decorator';
import { PostLikesService } from '@/post-likes/post-likes.service';
import { PostBody } from '@/posts/dto/post-body.dto';
import { PostsService } from '@/posts/posts.service';
import { User } from '@/users/entities/user.entity';
import { ValidateIdPipe } from '@/validator/validate-id.pipe';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    
    constructor(
        private readonly postsService: PostsService,
        private readonly postLikesService:PostLikesService
    ){}

    @Get()
    fetchPost(){
        return this.postsService.fetchPost()
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createPost(@Body() postBody:PostBody, @CurrentUser() user: User){
        return this.postsService.createPost(user, postBody)
    }

    @Put(":postId")
    @UsePipes(new ValidationPipe())
    @Post()
    updatePost(@Body() postBody:PostBody, @CurrentUser() user: User, @Param("postId", ValidateIdPipe) postId: number){
        return this.postsService.updatePost(user, postBody, postId)
    }

    @Delete(":postId")
    deletePost(@Param("postId", ValidateIdPipe) postId: number, @CurrentUser() user: User){
        return this.postsService.deletePost(user, postId)
    }

    @Patch(":postId/toggle-like")
    toggleLike(@Param("postId", ValidateIdPipe) postId: number, @CurrentUser() user: User){
        return this.postLikesService.toggleLikePost(user, postId)
    }
}
