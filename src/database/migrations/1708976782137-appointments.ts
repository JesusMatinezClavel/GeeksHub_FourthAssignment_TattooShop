// Creamos este .ts a través del terminal con typeorm migration:create
import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class Appointments1708976782137 implements MigrationInterface {
    // Llamaremos a esta función con el script "run-migrations" para crear la carpeta en cuestión.
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Llamaremos a esta función con el script "run-migrations" para crear la carpeta en cuestión.
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "appointment_date",
                        type: "date",
                        isUnique: true
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "service_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["service_id"],
                        referencedTableName: "services",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                ],
                uniques: [
                    new TableUnique({
                        name: "user_service_unique",
                        columnNames: ["user_id","service_id"]
                    })
                ]
            })
        )
    }
    // Llamaremos a esta función con el script "revert-migrations" para borrar ultima carpeta creada.
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }

}
