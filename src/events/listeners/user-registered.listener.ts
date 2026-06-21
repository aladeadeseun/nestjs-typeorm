/* eslint-disable prettier/prettier */
import type { UserRegisteredEvent } from "@/type";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class UserRegisteredListener {
    private readonly logger = new Logger(UserRegisteredListener.name)

    @OnEvent('user.registered')
    handleUserRegisteredEvent(event: UserRegisteredEvent){
        /**You will mainly do actiion here like send email, add notification for likes e.t.c */
        //console.log(event)
        this.logger.log(`Welcome, ${event.user.email} Your account has been setup at ${event.timestamp.toISOString()}`)
    }
}