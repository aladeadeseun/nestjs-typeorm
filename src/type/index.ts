/* eslint-disable prettier/prettier */
import { User } from "@/users/entities/user.entity";
import { Request } from "express";

export type IUser = Omit<User, "hasPassword" | "password">;

export type IUserResponse = IUser & { token:string };

export interface AuthRequest extends Request{
    user?:IUser | null,
    startTime: number
}

export type PaginationFormat = {
    currentPage: number,
    itemPerPage: number,
    totalPages: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}

export type PaginatedResponse<T extends object> = {
    items: T[],
    meta: PaginationFormat
}

export type UserRegisteredEvent = {
    user:Omit<User, "password">,
    timestamp: Date
}