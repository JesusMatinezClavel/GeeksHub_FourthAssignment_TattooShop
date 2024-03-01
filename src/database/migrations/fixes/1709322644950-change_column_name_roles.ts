import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnNameRoles1709322644950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('roles', 'name', new TableColumn({
            name: 'rolename',
            type: 'varchar',
            length: '255'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
