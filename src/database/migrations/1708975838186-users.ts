// Creamos este .ts a través del terminal con typeorm migration:create
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1708975838186 implements MigrationInterface {
    // Llamaremos a esta función con el script "run-migrations" para crear la carpeta en cuestión.
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Llamaremos a esta función con el script "run-migrations" para crear la carpeta en cuestión.
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "role_id",
                        type: "int",
                        default: 1
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedTableName: "roles",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        )
    }
    // Llamaremos a esta función con el script "revert-migrations" para borrar ultima carpeta creada.
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
