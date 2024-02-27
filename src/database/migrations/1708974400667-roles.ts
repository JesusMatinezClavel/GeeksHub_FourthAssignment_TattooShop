// Creamos este .ts a través del terminal con typeorm migration:create
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Roles1708974400667 implements MigrationInterface {
    // Llamaremos a esta función con el script "run-migrations" para crear la carpeta en cuestión.
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable (
            new Table ({
                name: "roles",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "40"
                    }
                ]
            }),
            true
        )
    }
    // Llamaremos a esta función con el script "revert-migrations" para borrar ultima carpeta creada.
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles")
    }

}
