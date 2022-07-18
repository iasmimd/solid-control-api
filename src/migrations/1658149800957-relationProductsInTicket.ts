import { MigrationInterface, QueryRunner } from "typeorm";

export class relationProductsInTicket1658149800957 implements MigrationInterface {
    name = 'relationProductsInTicket1658149800957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_470e53fb414cf1104837c1b8364"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "cartId"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "total" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "total" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_470e53fb414cf1104837c1b8364" FOREIGN KEY ("cartId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
