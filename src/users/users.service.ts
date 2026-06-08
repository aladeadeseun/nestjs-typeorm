/* eslint-disable prettier/prettier */
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Profile } from '@/users/entities/profile.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly profilesRepository: Repository<User>,
    ){}

    private selectUserByEmailOrUsernameQueryBuilder(email: string, username: string, toSelect:string[]){
        return this.usersRepository.createQueryBuilder('users')
            .select(toSelect)
            .where('users.email = :value', { value:email })
            .orWhere('users.username = :value', { value:username })
    }

    private generateToken(user: User): string{
        return sign({
            id:user.id,
            //username:user.username,
            //email:user.email
        }, process.env.JWT_SECRET!)
    }

    private generateResponse(user: User, generateToken: boolean) {
        delete user.password
        return generateToken ? {
            ...user,
            token:this.generateToken(user)
        } : user
    }

    getAllUser(){
        return {
            success:true,
            message:"Request successful",
            data:"Not yet implemented"
        }
    }

    async createUser(createUserDto: CreateUserDto){
        const existingUsers = await this.selectUserByEmailOrUsernameQueryBuilder(
            createUserDto.email, createUserDto.username, 
            ["users.email", "users.username", "users.id"]
        ).getMany();
    
        const errors: Record<"username" | "email", string[]> = {} as Record<"username" | "email", string[]>

        for(const existingUser of existingUsers){
            if(existingUser.email === createUserDto.email){
                errors["email"] = [`User with email of "${existingUser.email}" already exists.`]
            }
            if(existingUser.username === createUserDto.username){
                errors["username"] = [`User with username of "${existingUser.username}" already exists.`]
            }
        }

        if(Object.keys(errors).length > 0){
            throw new UnprocessableEntityException(errors)
        }

        return {
            message:"User successfully created",
            data:this.generateResponse(
                await this.usersRepository.save(
                    User.createInstance(createUserDto)
                ), 
                true
            )
        }
    }
}
