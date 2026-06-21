/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationQueryDto{
    @Type(()=>Number)
    @IsInt({message:"Page must be an integer"})
    @IsOptional()
    @Min(1, {message:"Page must be atleast 1."})
    @Max(100, {message : "Page can't exceed 100"})
    page?:number = 1

    @Type(()=>Number)
    @IsInt({message:"Limit must be an integer"})
    @IsOptional()
    @Min(1, {message:"Limit must be atleast 1."})
    @Max(100, {message : "Limit can't exceed 100"})
    limit?:number = 10
}