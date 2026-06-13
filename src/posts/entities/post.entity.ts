/* eslint-disable prettier/prettier */

import { PostLike } from "../../post-likes/entities/post-like.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { User } from "../../users/entities/user.entity";
import { BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "posts" })
export class Post  {

    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name :"authorId" })
    author!:User

    @OneToMany(()=>PostLike, (postLike) => postLike.post)
    likes!:PostLike[]

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: Date

    @Column({type:"text"})
    content!:string

    @OneToMany(() => Comment, (comment) => comment.post)
    comments!:Comment[]

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date()
    }
}