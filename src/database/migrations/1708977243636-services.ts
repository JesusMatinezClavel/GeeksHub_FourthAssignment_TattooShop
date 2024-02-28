// Creamos este .ts a través del terminal con typeorm migration:create
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Services1708977243636 implements MigrationInterface {
    // Llamaremos a esta función con el script "run-migrations" para crear la tabla en cuestión.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "services",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "service_name",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false
                //     },
                //     {
                //         name: "tattoo_id",
                //         type: "int",
                //     },
                //     {
                //         name: "piercing_id",
                //         type: "int",
                //     }
                // ],
                // foreignKeys: [
                //     {
                //         columnNames: ["tattoo_id"],
                //         referencedTableName: "tattoo_catalogue",
                //         referencedColumnNames: ["id"],
                //         onDelete: "CASCADE"
                //     },
                //     {
                //         columnNames: ["piercing_id"],
                //         referencedTableName: "piercing_catalogue",
                //         referencedColumnNames: ["id"],
                //         onDelete: "CASCADE"
                    }
                ],
            }),
            true
        )
    }
    // Llamaremos a esta función con el script "revert-migrations" para borrar ultima carpeta creada.
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("services")
    }

}
