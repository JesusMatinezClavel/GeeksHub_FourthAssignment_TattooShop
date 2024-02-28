import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnsToServices1709153874646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('services', new TableColumn({
            name: 'tattoo_id',
            type: 'int'
        })
        )
        const tattooForeignKeys = new TableForeignKey({
            columnNames: ['tattoo_id'],
            referencedTableName: 'tattoo_catalogue',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        })

        await queryRunner.addColumn('services', new TableColumn({
            name: 'piercing_id',
            type: 'int'
        })
        )
        const piercingForeignKeys = new TableForeignKey({
            columnNames: ['piercing_id'],
            referencedTableName: 'piercing_catalogue',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
        })
        await queryRunner.createForeignKeys('services',[tattooForeignKeys,piercingForeignKeys])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('services','tattoo_id')
        await queryRunner.dropColumn('services','piercing_id')
    }

}
