import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterTableTransactionAlterColumnCategoryName1616719936992
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    await queryRunner.dropColumn('transactions', 'category');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transactions', 'TransactionCategory');

    await queryRunner.dropColumn('transactions', 'provider_id');

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
