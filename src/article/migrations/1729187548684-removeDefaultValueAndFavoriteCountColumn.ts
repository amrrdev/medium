import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDefaultValueAndFavoriteCountColumn1729187548684 implements MigrationInterface {
    name = 'RemoveDefaultValueAndFavoriteCountColumn1729187548684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "favoritesCount"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "body" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
    }

}
