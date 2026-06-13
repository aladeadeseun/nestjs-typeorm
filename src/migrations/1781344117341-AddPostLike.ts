/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostLike1781344117341 implements MigrationInterface {
    name = 'AddPostLike1781344117341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_likes\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`postId\` int UNSIGNED NULL, \`userId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_likes\` ADD CONSTRAINT \`FK_6999d13aca25e33515210abaf16\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_likes\` ADD CONSTRAINT \`FK_37d337ad54b1aa6b9a44415a498\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_likes\` DROP FOREIGN KEY \`FK_37d337ad54b1aa6b9a44415a498\``);
        await queryRunner.query(`ALTER TABLE \`post_likes\` DROP FOREIGN KEY \`FK_6999d13aca25e33515210abaf16\``);
        await queryRunner.query(`DROP TABLE \`post_likes\``);
    }

}
