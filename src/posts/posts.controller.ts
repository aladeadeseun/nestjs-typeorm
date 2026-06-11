/* eslint-disable prettier/prettier */
import { CurrentUser } from '@/auth/decorator/current-user.decorator';
import { CreatePost } from '@/posts/dto/create-post.dto';
import { PostsService } from '@/posts/posts.service';
import { User } from '@/users/entities/user.entity';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    
    constructor(private readonly postsService: PostsService){}

    @UsePipes(new ValidationPipe())
    @Post()
    createPost(@Body() postBody:CreatePost, @CurrentUser() user: User){
        return this.postsService.createPost(user, postBody)
    }
}
