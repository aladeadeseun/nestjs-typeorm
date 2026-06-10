/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export const ormConfig= new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrationsTableName:'migrations',
  migrations:[__dirname + '/migrations/**/*{.js,.ts}'],
  synchronize:false
});
