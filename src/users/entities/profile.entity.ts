/* eslint-disable prettier/prettier */
import {
	Entity,
	Column,
	OneToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({ name: "profiles" })
export class Profile  {

	@PrimaryGeneratedColumn({unsigned:true, type:"integer"})
	id!: number;

	@Column({ type: "text", nullable: true })
	bio!: string;

	@Column({ length: 100, nullable: true })
	image!: string

	@OneToOne(() => User, (user: User) => user.profile, { cascade: true })
	@JoinColumn()
	user!: User;
}
