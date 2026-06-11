/* eslint-disable prettier/prettier */

import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SaveBioDto{
    @MaxLength(200, {message:"Max bio is 200"})
    @MinLength(3, {message:"Minimum bio is 3"})
    @IsNotEmpty({message:"Your bio is required"})
    bio!:string
}