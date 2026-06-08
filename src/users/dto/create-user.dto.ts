/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsStrongPassword, Max, Min } from "class-validator";

export class CreateUserDto{
    
    @Max(30, {message:"Max username is 30"})
    @Min(3, {message:"Minimum username is 3"})
    @IsNotEmpty()
    readonly username!:string

    @Max(30, {message:"Max username is 30"})
    @IsEmail()
    readonly email!:string

    @Max(30, {message:"Max username is 30"})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
    })
    @IsNotEmpty()
    readonly password!:string

    @IsNotEmpty()
    @Max(50, {message:"Max firstname is 50"})
    @Min(3, {message:"Minimum firstname is 3"})
    readonly firstname!:string

    @IsNotEmpty()
    @Max(50, {message:"Max lastname is 50"})
    @Min(3, {message:"Minimum lastname is 3"})
    readonly lastname!:string
}
