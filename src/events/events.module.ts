/* eslint-disable prettier/prettier */
import EventsService from '@/events/events.service';
import { UserRegisteredListener } from '@/events/listeners/user-registered.listener';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        EventEmitterModule.forRoot({
            global: true,
            wildcard:false,
            maxListeners: 20,
            verboseMemoryLeak: true
        })
    ],
    providers: [EventsService, UserRegisteredListener],
    exports: [EventsService]
})
export class EventsModule {}
