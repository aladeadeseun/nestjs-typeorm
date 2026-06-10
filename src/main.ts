/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { formatErrors } from '@/common/util';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import helmet from 'helmet';
import { CORS_ORIGIN } from '@/common/constant';

async function bootstrap() {

	const app = await NestFactory.create(AppModule);
	// somewhere in your initialization file
	app.use(helmet());
	app.enableCors({origin:CORS_ORIGIN,credentials: true})
	
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
