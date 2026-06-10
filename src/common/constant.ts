import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.getOrThrow('JWT_SECRET'),
};

export const CORS_ORIGIN = configService.getOrThrow('CORS_ORIGIN');

export const NODE_ENV = configService.getOrThrow('NODE_ENV');
