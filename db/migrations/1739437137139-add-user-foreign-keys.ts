import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserForeignKeys1739437137139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_user_auth"
            FOREIGN KEY ("authId")
            REFERENCES "auth"("id")
            ON DELETE CASCADE;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_user_auth";`,
    );
  }
}
