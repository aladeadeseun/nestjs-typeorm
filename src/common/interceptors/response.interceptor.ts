/* eslint-disable prettier/prettier */

import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((response) => {

				if (response instanceof StreamableFile) return response

				if (response?.success !== undefined) {
					return response;
				}
				return {
					success: true,
					message: response?.message || 'Request successful',
					data: response?.data ?? null,
				};
			}),
		);
	}
}
