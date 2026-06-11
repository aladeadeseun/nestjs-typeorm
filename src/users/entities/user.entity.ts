/* eslint-disable prettier/prettier */

import {
    Entity,
    Column,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
    Index,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { hash } from 'bcrypt';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: "users" })
@Index('IDX_USERS_EMAIL', ['email'], { unique: true })
@Index('IDX_USERS_USERNAME', ['username'], { unique: true })
export class User  {

    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @Column({ length: 60, nullable: false })
    firstname!: string;

    @Column({ length: 60, nullable: false })
    lastname!: string;

    @Column({ length: 50, nullable: false })
    username!: string

    @Column({ length: 50, nullable: false })
    email!: string

    @OneToOne(() => Profile, (profile: Profile) => profile.user)
    profile!: Profile;

    @Column()
    password?: string

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword() {
        if (this.password) {
            console.log(this.password)
            //const salt = await bcrypt.genSalt(10)
            this.password = await hash(this.password.trim(), 10)
        }
    }

    @OneToMany(() => Post, (post) => post.author)
    posts!:Post[]

    // @UpdateDateColumn({type:'timestamp'})
    // updatedAt!:Date
    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt!: Date

    @Column({ type:"timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt!: Date

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date()
    }
}