/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Profile } from './profile.entity';
import { hash } from 'bcrypt';


@Entity({name:"users"})
export class User {
    @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
    id!: number;

    @Column({length:60, nullable:false})
    firstname!: string;

    @Column({length:60, nullable:false})
    lastname!: string;

    @Column({length:50, nullable:false})
    username!:string

    @OneToOne(() => Profile, (profile: Profile) => profile.user)
    profile!: Profile;

    @Column()
    password?:string

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword(){
        if(this.password){
            //const salt = await bcrypt.genSalt(10)
            this.password = await hash(this.password.trim(), 10)
        }
    }
}