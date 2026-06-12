/* eslint-disable prettier/prettier */

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserFollow1781253143811 implements MigrationInterface {
    name = 'UpdateUserFollow1781253143811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_follows\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_follows\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_follows\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user_follows\` DROP COLUMN \`createdAt\``);
    }

}
