/* eslint-disable prettier/prettier */
import {
	Entity,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity({ name: "profiles" })
export class Profile extends AbstractEntity {

	@Column({ type: "text", nullable: true })
	bio!: string;

	@Column({ length: 100, nullable: true })
	image!: string

	@OneToOne(() => User, (user: User) => user.profile, { cascade: true })
	@JoinColumn()
	user!: User;
}
