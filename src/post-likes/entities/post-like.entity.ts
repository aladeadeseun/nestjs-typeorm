/* eslint-disable prettier/prettier */

import { Post } from "../../posts/entities/post.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "post_likes" })
@Index(['post', 'user'], { unique: true })
export class PostLike  {

    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @ManyToOne(() => Post, (post) => post.likes)
    @JoinColumn({ name :"postId" })
    post!:Post

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name :"userId" })
    user!:User

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date
}