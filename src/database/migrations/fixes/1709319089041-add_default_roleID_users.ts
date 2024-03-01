import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDefaultRoleIDUsers1709319089041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('users','role_id',new TableColumn({
            name: 'role_id',
            type: 'int',
            default: 1
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
