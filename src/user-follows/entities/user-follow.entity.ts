/* eslint-disable prettier/prettier */


import { User } from "../../users/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_follows" })
export class UserFollow  {
    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @ManyToOne(() => User, (user) => user.followings)
    @JoinColumn({ name :"followingId" })
    following!:User

    @ManyToOne(() => User, (user)=>user.followers)
    @JoinColumn({name:"followerId"})
    follower!:User

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: Date

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date()
    }
}