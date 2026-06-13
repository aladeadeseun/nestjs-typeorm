/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotificationAddEnitity1781347572122 implements MigrationInterface {
    name = 'UpdateNotificationAddEnitity1781347572122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD \`entityId\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP COLUMN \`entityId\``);
    }

}
