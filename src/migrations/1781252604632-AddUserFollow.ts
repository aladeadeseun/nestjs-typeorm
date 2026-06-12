/* eslint-disable prettier/prettier */

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserFollow1781252604632 implements MigrationInterface {
    name = 'AddUserFollow1781252604632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_follows\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`followingId\` int UNSIGNED NULL, \`followerId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_follows\` ADD CONSTRAINT \`FK_7c6c27f12c4e972eab4b3aaccbf\` FOREIGN KEY (\`followingId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_follows\` ADD CONSTRAINT \`FK_6300484b604263eaae8a6aab88d\` FOREIGN KEY (\`followerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_follows\` DROP FOREIGN KEY \`FK_6300484b604263eaae8a6aab88d\``);
        await queryRunner.query(`ALTER TABLE \`user_follows\` DROP FOREIGN KEY \`FK_7c6c27f12c4e972eab4b3aaccbf\``);
        await queryRunner.query(`DROP TABLE \`user_follows\``);
    }

}
