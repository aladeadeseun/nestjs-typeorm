/* eslint-disable prettier/prettier */
import { User } from "@/users/entities/user.entity";
import { Request } from "express";

export type IUser = Omit<User, "hasPassword" | "password">;

export type IUserResponse = IUser & { token:string };

export interface AuthRequest extends Request{
    user?:IUser | null
}