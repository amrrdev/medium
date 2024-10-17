import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveSlugColumn1729095606930 implements MigrationInterface {
  name = 'RemoveSlugColumn1729095606930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "slug"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" ADD "slug" character varying NOT NULL`);
  }
}
