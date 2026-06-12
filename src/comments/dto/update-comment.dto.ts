/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateComment{
    @MaxLength(200, {message:"Max post body is 200"})
    @MinLength(3, {message:"Minimum post body is 3"})
    @IsNotEmpty({message:"Post body is required"})
    content!:string
}