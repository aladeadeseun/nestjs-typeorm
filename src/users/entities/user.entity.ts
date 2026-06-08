/* eslint-disable prettier/prettier */

import {
    Entity,
    Column,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
    Index,
} from 'typeorm';
import { Profile } from './profile.entity';
import { hash } from 'bcrypt';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity({ name: "users" })
@Index('IDX_USERS_EMAIL', ['email'], { unique: true })
@Index('IDX_USERS_USERNAME', ['username'], { unique: true })
export class User extends AbstractEntity {

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
            //const salt = await bcrypt.genSalt(10)
            this.password = await hash(this.password.trim(), 10)
        }
    }
}