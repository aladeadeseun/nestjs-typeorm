/* eslint-disable prettier/prettier */
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/decorator/is-public';
import { User } from '@/auth/decorator/user.decorator';
import type { LoginUserDto } from '@/auth/dto/login-user.dto';
import type { IUser } from '@/type';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @Post("login")
    loginUser(@Body("login") loginUserDto:LoginUserDto){
        return this.authService.signIn(loginUserDto)
    }

    @Get("current-user")
    getCurrentUser(@User() user:IUser){
        return user
    }
}
