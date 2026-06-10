/* eslint-disable prettier/prettier */

import { IsNotEmpty, MaxLength, MinLength, ValidationArguments } from "class-validator";

export class SaveBioDto{
    @MaxLength(200, {message:(arg:ValidationArguments)=>{
        console.log(arg)
        return `"Max bio is ${arg.constraints[0]}"`}
    })
    @MinLength(3, {message:"Minimum bio is 3"})
    @IsNotEmpty({message:"Your bio is required"})
    bio!:string
}