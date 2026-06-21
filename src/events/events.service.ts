/* eslint-disable prettier/prettier */
import { UserRegisteredEvent } from "@/type";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export default class EventsService{
    constructor(
        private readonly eventEmitter: EventEmitter2
    ){}

    emitUserRegistered(user: UserRegisteredEvent['user']): void{
        const event: UserRegisteredEvent = {
            user, timestamp: new Date()
        }
        this.eventEmitter.emit("user.registered", event)
    }
}