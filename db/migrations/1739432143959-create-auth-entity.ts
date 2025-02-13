import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAuthEntity1739432143959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
            default: "'user'",
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'adminId',
            type: 'int',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'isDeactivated',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isDeleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
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

    // Add foreign keys *after* tables exist
    await queryRunner.query(`
    ALTER TABLE "auth"
    ADD CONSTRAINT "FK_auth_user"
    FOREIGN KEY ("userId")
    REFERENCES "users"("id")
    ON DELETE SET NULL;
  `);

    await queryRunner.query(`
    ALTER TABLE "auth"
    ADD CONSTRAINT "FK_auth_admin"
    FOREIGN KEY ("adminId")
    REFERENCES "admins"("id")
    ON DELETE SET NULL;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth');
  }
}
