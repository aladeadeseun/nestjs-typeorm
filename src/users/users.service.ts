/* eslint-disable prettier/prettier */
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { LoginUserDto } from '@/users/dto/login-user.dto';
import { Profile } from '@/users/entities/profile.entity';
import { User } from '@/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
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
            throw new UnprocessableEntityException({success:false, errors, message:"Validation error"})
        }

        const user = new User();

        Object.assign(user, createUserDto)

        return {
            message:"User successfully created",
            data:this.generateResponse(
                await this.usersRepository.save(user), 
                false
            )
        }
    }

    async loginUserIn({usernameOrEmail, password}: LoginUserDto){

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

        const user = await this.usersRepository.createQueryBuilder('users')
            .select(["users.email", "users.username", "users.id", "users.password", "users.lastname", "users.firstname"])
            .where('users.email = :value', { value:usernameOrEmail })
            .orWhere('users.username = :value', { value:usernameOrEmail })
            .leftJoinAndSelect("users.profile", "profile").getOne()

        console.log(user)

        //console.log(loginUserDto.password, user?.password)

        if(!user || !(await compare(password, user.password!))) 
            throw new HttpException({success:false, message:"Invalid login detail."}, HttpStatus.UNAUTHORIZED)

        return {
            data:this.generateResponse(user, true),
            message:"You have being successfully logged in."
        }
    }
}
