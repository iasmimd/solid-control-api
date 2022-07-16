import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657996590421 implements MigrationInterface {
    name = 'createTables1657996590421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_73259b799fbc3b4902c0441cc46"`);
        await queryRunner.query(`ALTER TABLE "stock" RENAME COLUMN "supplyIdId" TO "supplyId"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2e200c99875b2e0378b8af076b0" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2e200c99875b2e0378b8af076b0"`);
        await queryRunner.query(`ALTER TABLE "stock" RENAME COLUMN "supplyId" TO "supplyIdId"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_73259b799fbc3b4902c0441cc46" FOREIGN KEY ("supplyIdId") REFERENCES "supply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
