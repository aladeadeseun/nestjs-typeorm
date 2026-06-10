/* eslint-disable prettier/prettier */
import { removePassword } from '@/common/util';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SaveBioDto } from '@/users/dto/save-bio.dto';
import { Profile } from '@/users/entities/profile.entity';
import { User } from '@/users/entities/user.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly profilesRepository: Repository<Profile>,
    ){}

    private selectUserByEmailOrUsernameQueryBuilder(email: string, username: string, toSelect:string[]){
        return this.usersRepository.createQueryBuilder('users')
            .select(toSelect)
            .where('users.email = :value', { value:email })
            .orWhere('users.username = :value', { value:username })
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
            data:removePassword(await this.usersRepository.save(user))
        }
    }

    getOneUserByEmailOrUsername(usernameOrEmail: string){
        return this.usersRepository.createQueryBuilder('users')
            .select(["users.email", "users.username", "users.id", "users.password", "users.lastname", "users.firstname"])
            .where('users.email = :value', { value:usernameOrEmail })
            .orWhere('users.username = :value', { value:usernameOrEmail })
            .leftJoinAndSelect("users.profile", "profile").getOne()   
    }

    async getOneUserWithProfileById(id:string){
        return removePassword(
            await this.usersRepository.findOne({where:{id:parseInt(id)}, relations:{profile:true}})
        )
    }

    async saveUserBio(user: User, bio: SaveBioDto){
        
        let profile: Profile | null = null

        if(!user.profile){
            profile = new Profile()
            profile.user = user
        }else{
            profile = user.profile
        }
        
        Object.assign(profile, bio)

        profile = await this.profilesRepository.save(profile)

        delete (profile as any).user

        user.profile = profile

        //save in database
        return {
            message:"User bio data successfully saved",
            data:user
        }
    }
}
