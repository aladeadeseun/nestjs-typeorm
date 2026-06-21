/* eslint-disable prettier/prettier */

import { PaginationQueryDto } from "@/common/dto/pagination.dto";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class FindPostsQueryDto extends PaginationQueryDto{
    @MaxLength(100, { message : "Title search can't exceed 100 characters."})
    @IsString({ message : "Title must be a string"})
    @IsOptional()
    title?:string
}