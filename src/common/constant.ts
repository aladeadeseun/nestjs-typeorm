import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.getOrThrow('JWT_SECRET'),
};

export const CORS_ORIGIN = configService.getOrThrow('CORS_ORIGIN');

export const NODE_ENV = configService.getOrThrow('NODE_ENV');

export const MAX_AVATAR_SIZE = 50 * 1024;

export const AVATAR_UPLOAD_DIR = './uploads/avatars';
