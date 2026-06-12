/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateComment{
    @MaxLength(200, {message:"Max post body is 200"})
    @MinLength(3, {message:"Minimum post body is 3"})
    @IsNotEmpty({message:"Post body is required"})
    content!:string

    @IsInt({message:"Post ID must be a number"})
    @IsNotEmpty({message:"Post ID is required"})
    postId!:number
}