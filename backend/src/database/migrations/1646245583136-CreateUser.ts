import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1646245583136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'users',
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            isUnique: true,
                        },
                        {
                            name: "name",
                            type: "varchar",
                            isNullable: false,
                            length: "50"
                        },
                        {
                            name: "email",
                            type: "varchar",
                            isNullable: false,
                            isUnique: true,
                            length: "50"
                        },
                        {
                            name: "password",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "is_validated",
                            type: "boolean",
                            isNullable: false,
                            default: false,
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
