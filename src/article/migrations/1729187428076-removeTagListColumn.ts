import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTagListColumn1729187428076 implements MigrationInterface {
    name = 'RemoveTagListColumn1729187428076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "tagList"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "tagList" text NOT NULL`);
    }

}
