/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { NODE_ENV } from '@/common/constant';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UserFollowsModule } from './user-follows/user-follows.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
	imports: [
		ThrottlerModule.forRoot({
			throttlers: [
				{
					ttl: 60_000, //1 minute
					limit: NODE_ENV === "development" ? 1_000 : 10, //can only make 10 request
				},
			],
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		UsersModule,
		AuthModule,
		PostsModule,
		CommentsModule,
		UserFollowsModule,
		NotificationsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
      		provide: APP_GUARD,
      		useClass: ThrottlerGuard,
    	},
	],
})
export class AppModule { }
