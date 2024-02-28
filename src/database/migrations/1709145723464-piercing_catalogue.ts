import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PiercingCatalogue1709145723464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "piercing_catalogue",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "piercing_name",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "piercing_design",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "piercing_description",
                        type: "text",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: 'service_id',
                        type: 'int'
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["service_id"],
                        referencedTableName: "services",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("piercing_catalogue")
    }

}
