/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIndexToFollowAndNotification1781348257805 implements MigrationInterface {
    name = 'AddedIndexToFollowAndNotification1781348257805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entityId\` \`entityId\` int UNSIGNED NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_48050dfc1d2514f4c2059f155e\` ON \`user_follows\` (\`followingId\`, \`followerId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_c41d2e11e67c5f5759ebf81018\` ON \`notifications\` (\`actorId\`, \`recipientId\`, \`entityId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_30ee85070afe5b92b5920957b1\` ON \`post_likes\` (\`postId\`, \`userId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_30ee85070afe5b92b5920957b1\` ON \`post_likes\``);
        await queryRunner.query(`DROP INDEX \`IDX_c41d2e11e67c5f5759ebf81018\` ON \`notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_48050dfc1d2514f4c2059f155e\` ON \`user_follows\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` CHANGE \`entityId\` \`entityId\` int UNSIGNED NOT NULL DEFAULT '0'`);
    }

}
