import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminForeignKeys1739437064234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "admins"
            ADD CONSTRAINT "FK_admins_auth"
            FOREIGN KEY ("authId")
            REFERENCES "auth"("id")
            ON DELETE CASCADE;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admins" DROP CONSTRAINT "FK_admins_auth";`,
    );
  }
}
