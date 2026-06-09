/* eslint-disable prettier/prettier */
import { CreateUserDto } from '@/users/dto/create-user.dto';
import type { LoginUserDto } from '@/users/dto/login-user.dto';
import { UsersService } from '@/users/users.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService){}

    @Get()
    fetchAll(){
        return this.userService.getAllUser()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body('user') createUser: CreateUserDto){
        return this.userService.createUser(createUser)
    }

    @Post("login")
    loginUser(@Body("login") loginUserDto:LoginUserDto){
        return this.userService.loginUserIn(loginUserDto)
    }
}
