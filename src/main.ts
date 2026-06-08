/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatErrors } from '@/common/util';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);
	
	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: true,
			whitelist: true,
			transform: true,
			exceptionFactory: (validationErrors = []) => {
				return new UnprocessableEntityException({
					success: false,
					message: 'Validation failed',
					errors:formatErrors(validationErrors),
				});
			},
		}),
	);

	app.useGlobalInterceptors(new ResponseInterceptor());

	app.useGlobalFilters(new GlobalExceptionFilter());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
