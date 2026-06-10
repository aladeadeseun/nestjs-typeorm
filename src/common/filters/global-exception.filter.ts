/* eslint-disable prettier/prettier */
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        
        console.log(exception)

        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors: any = null;

        const isDev = process.env.NODE_ENV === "development"

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            
            const exceptionResponse = exception.getResponse();
            
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const errorResponse = exceptionResponse as Record<string, any>;
                message = errorResponse.message ?? message;
                errors = errorResponse.errors || null;
            } else {
                message = String(exceptionResponse);
            }
        }

        const isServerError = Number(status) >= 500

        const errorRes: Record<string, any> = {
            success: false,
            status, 
            errors, message: (isServerError ? ('Internal server error') : message)
        }

        if(isDev && isServerError){
            errorRes.timestamp = new Date().toISOString()
            errorRes.path = request.url
        }

        response.status(status).json(errorRes);
    }
}
