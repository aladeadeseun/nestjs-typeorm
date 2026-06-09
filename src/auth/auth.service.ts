/* eslint-disable prettier/prettier */

import type { LoginUserDto } from '@/auth/dto/login-user.dto';
import { removePassword } from '@/common/util';
import { UsersService } from '@/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn({usernameOrEmail, password}: LoginUserDto){

        if(
            !usernameOrEmail 
            || (typeof(usernameOrEmail) !== "string")
            || (usernameOrEmail.length < 3) 
            || (usernameOrEmail.length > 30) 
            || !password 
            || (typeof(password) !== "string")
            || (password.length < 8) 
            || (password.length > 30)
        ) 
            throw new HttpException({success:false, message:"Invalid login detail"}, HttpStatus.UNAUTHORIZED)

        const user = await this.usersService.getOneUserByEmailOrUsername(usernameOrEmail)

        if(!user || !(await compare(password, user.password!))) 
            throw new HttpException({success:false, message:"Invalid login detail."}, HttpStatus.UNAUTHORIZED)

        return {
            data:{
                ...removePassword(user), 
                token: await this.jwtService.signAsync({sub:user.id}),
            },
            message:"You have being successfully logged in."
        }
    }
}
