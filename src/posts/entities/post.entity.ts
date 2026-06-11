/* eslint-disable prettier/prettier */

import { User } from "../../users/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post  {

    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name :"authorId" })
    author!:User

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: Date

    @Column({type:"text"})
    content!:string

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date()
    }
}