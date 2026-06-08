/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({name:"profiles"})
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"text", nullable:true})
    bio!: string;

    @Column({length:100, nullable:true})
    image!: string

    @OneToOne(() => User, (user: User) => user.profile)
    @JoinColumn()
    user!: User;
}
