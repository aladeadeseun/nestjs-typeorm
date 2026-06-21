/* eslint-disable prettier/prettier */
import { AuthService } from '@/auth/auth.service';
import { Public } from '@/auth/decorator/is-public';
import { CurrentUser } from '@/auth/decorator/current-user.decorator';
import type { LoginUserDto } from '@/auth/dto/login-user.dto';
import type { IUser } from '@/type';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginThrottlerGuard } from '@/auth/guards/login-throttler.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @UseGuards(LoginThrottlerGuard)
    @Post("login")
    loginUser(@Body("login") loginUserDto:LoginUserDto){
        return this.authService.signIn(loginUserDto)
    }

    @Get("current-user")
    getCurrentUser(@CurrentUser() user:IUser){
        return user
    }
}
