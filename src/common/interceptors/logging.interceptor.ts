/* eslint-disable prettier/prettier */

import { AuthRequest } from "@/type";
import { ExecutionContext, Injectable, Logger, NestInterceptor, CallHandler, } from "@nestjs/common";
import { Request } from "express";
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    private readonly logger = new Logger(LoggingInterceptor.name)
    
    //context -> contains request and response objects
    //control -> route handler executes
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<AuthRequest>()

        const {method, url, params, body} = request

        const userAgent = request.get('user-agent') ?? "Unknown"

        const userId = request.user?.id ?? "Anonymous"

        this.logger.log(`
            [${method} ${url} - User: ${userId} - User-Agent ${userAgent} - Param ${JSON.stringify(params)} - Body ${JSON.stringify(body)}]
        `)

        const startTime = Date.now()

        //tap is operator that allow us to perform side effects
        return next.handle().pipe(
            tap({
                next : (data) => {
                    const endTime = Date.now()
                    const duration = endTime - startTime
                    this.logger.log(`
                        [${method} ${url} - ${duration}ms]
                    `)
                    return data
                },
                error : (err) => {
                    const endTime = Date.now()
                    const duration = endTime - startTime
                    this.logger.log(`
                        [${method} ${url} - ${duration}ms - Error ${(err as Error).message}]
                    `)
                    return err
                }
            })
        );
    }
}