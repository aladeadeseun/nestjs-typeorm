/* eslint-disable prettier/prettier */

import { IS_PUBLIC_KEY } from '@/auth/decorator/is-public';
import { AuthRequest } from '@/type';
import { UsersService } from '@/users/users.service';
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService, 
        private readonly userService: UsersService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        //It's a public route no auth required.
        if (isPublic) {
            // 💡 See this condition
            return true;
        }
        
        const request = context.switchToHttp().getRequest<AuthRequest>();
        
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new HttpException({
                success:false, message:"Your session has expired or is invalid. Please log in again."}, HttpStatus.UNAUTHORIZED)
        }

        try {
            // 💡 Here the JWT secret key that's used for verifying the payload 
            // is the key that was passed in the JwtModule
            const payload: {sub: string} = await this.jwtService.verifyAsync(token);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request.user = await this.userService.getOneUserWithProfileById(payload.sub);
        } catch {
            throw new HttpException({success:false, message:"Your session has expired or is invalid. Please log in again."}, HttpStatus.UNAUTHORIZED)
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
