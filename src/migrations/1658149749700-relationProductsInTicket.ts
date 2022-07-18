import { MigrationInterface, QueryRunner } from "typeorm";

export class relationProductsInTicket1658149749700 implements MigrationInterface {
    name = 'relationProductsInTicket1658149749700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "total" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "total"`);
    }

}
