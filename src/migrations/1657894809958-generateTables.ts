import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1657894809958 implements MigrationInterface {
    name = 'generateTables1657894809958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supply" ADD "qtd" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supply" DROP COLUMN "qtd"`);
    }

}
