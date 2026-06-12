/* eslint-disable prettier/prettier */

import { CurrentUser } from '@/auth/decorator/current-user.decorator';
import { CommentsService } from '@/comments/comments.service';
import { CreateComment } from '@/comments/dto/create-comment.dto';
import { UpdateComment } from '@/comments/dto/update-comment.dto';
import { User } from '@/users/entities/user.entity';
import { ValidateIdPipe } from '@/validator/validate-id.pipe';
import { Body, Controller, Delete, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
    
    constructor(private readonly commentsService: CommentsService){}

    @UsePipes(new ValidationPipe())
    @Post()
    createComment(@Body() createComment:CreateComment, @CurrentUser() user: User){
        return this.commentsService.create(createComment, user)
    }

    @Put(":commentId")
    @UsePipes(new ValidationPipe())
    @Post()
    updateComment(@Body() updateComment:UpdateComment, @CurrentUser() user: User, @Param("commentId", ValidateIdPipe) commentId: number){
        return this.commentsService.updateComment(updateComment, user, commentId)
    }

    @Delete(":commentId")
    deleteComment(@Param("commentId", ValidateIdPipe) commentId: number, @CurrentUser() user: User){
        return this.commentsService.deleteComment(user, commentId)
    }
}
