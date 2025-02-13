import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderEntity1739465344792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create orders table
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'userId', type: 'int', isNullable: true },
          {
            name: 'totalPrice',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: '0',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'canceled'],
            default: "'pending'",
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Create order_items table
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'orderId', type: 'int' },
          { name: 'groceryId', type: 'int' },
          { name: 'quantity', type: 'int', default: '1' },
          { name: 'price', type: 'decimal', precision: 10, scale: 2 },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    // Add foreign keys
    await queryRunner.createForeignKeys('orders', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    ]);

    await queryRunner.createForeignKeys('order_items', [
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['groceryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groceries',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_items');
    await queryRunner.dropTable('orders');
  }
}
