/* eslint-disable prettier/prettier */

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotification1781282173593 implements MigrationInterface {
    name = 'AddNotification1781282173593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` enum ('FOLLOW', 'LIKE', 'COMMENT') NOT NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`recipientId\` int UNSIGNED NOT NULL, \`actorId\` int UNSIGNED NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_db873ba9a123711a4bff527ccd5\` FOREIGN KEY (\`recipientId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_44412a2d6f162ff4dc1697d0db7\` FOREIGN KEY (\`actorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_44412a2d6f162ff4dc1697d0db7\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_db873ba9a123711a4bff527ccd5\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
    }

}
