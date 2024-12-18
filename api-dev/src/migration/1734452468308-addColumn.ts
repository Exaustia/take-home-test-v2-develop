import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumn1734452468308 implements MigrationInterface {
  name = "addColumn1734452468308";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD "emoji" character varying NOT NULL DEFAULT '🍔'`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD "tag" character varying NOT NULL DEFAULT 'meat'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "emoji"`);
  }
}
