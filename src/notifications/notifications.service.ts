/* eslint-disable prettier/prettier */

import { Notification } from '@/notifications/entities/notification.entity';
import { NotificationType } from '@/notifications/enum/notification-type.enum';
import { User } from '@/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ){}

    async createNotification(actor: User, recipientId: number, type:NotificationType){
        //check if recipient exist
        const recipient = await this.usersRepository.findOneBy({id:recipientId})

        if(!recipient){
            throw new NotFoundException({message:"Notification recipient cannot be found."})
        }

        const notification = new Notification()
        notification.actor = actor
        notification.recipient = recipient
        notification.type = type

        await this.notificationsRepository.save(notification)
    }
}
