import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserColumnToAutho1729190725923 implements MigrationInterface {
    name = 'RenameUserColumnToAutho1729190725923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_a9d18538b896fe2a6762e143bea"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "userId" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "authorId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
