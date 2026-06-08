/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAndProfile1780934871922 implements MigrationInterface {
    name = 'AddUserAndProfile1780934871922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
