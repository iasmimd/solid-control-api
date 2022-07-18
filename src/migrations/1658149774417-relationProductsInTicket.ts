import { MigrationInterface, QueryRunner } from "typeorm";

export class relationProductsInTicket1658149774417 implements MigrationInterface {
    name = 'relationProductsInTicket1658149774417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "total" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "total" integer NOT NULL`);
    }

}
