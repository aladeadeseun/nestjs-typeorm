/* eslint-disable prettier/prettier */

import { NotificationType } from "../../notifications/enum/notification-type.enum";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "notifications" })
export class Notification  {

    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @ManyToOne(() => User, (user) => user.recipients, {nullable:false})
    @JoinColumn({ name :"recipientId" })
    recipient!:User

    @ManyToOne(() => User, (user) => user.actors, {nullable:false})
    @JoinColumn({ name :"actorId" })
    actor!:User

    @Column({
        type: 'enum',
        enum: NotificationType,
        nullable:false
    })
    type!: NotificationType;

    @Column({default:false})
    isRead!:boolean

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date
}