/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    
    @MaxLength(30, {message:"Max username is 30"})
    @MinLength(3, {message:"Minimum username is 3"})
    @IsNotEmpty({message:"Username is required"})
    readonly username!:string

    @MaxLength(30, {message:"Max username is 30"})
    @IsEmail(undefined, {message:"Invalid email address"})
    @IsNotEmpty({message:"Email is required"})
    readonly email!:string

    
    @MaxLength(30, {message:"Max password is 30"})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
    })
    @IsNotEmpty({message:"Password is required"})
    readonly password!:string

    @MaxLength(50, {message:"Max firstname is 50"})
    @MinLength(3, {message:"Minimum firstname is 3"})
    @IsNotEmpty({message:"Firstname is required"})
    readonly firstname!:string

    @MaxLength(50, {message:"Max lastname is 50"})
    @MinLength(3, {message:"Minimum lastname is 3"})
    @IsNotEmpty({message:"Lastname is required"})
    readonly lastname!:string
}
