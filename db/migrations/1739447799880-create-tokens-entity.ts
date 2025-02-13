import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokensEntity1739447799880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens', // Ensure this matches the entity name
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'accessToken',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'authId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.query(`
          ALTER TABLE "tokens"
          ADD CONSTRAINT "FK_tokens_auth"
          FOREIGN KEY ("authId")
          REFERENCES "auth"("id")
          ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
