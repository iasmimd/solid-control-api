import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1657892820540 implements MigrationInterface {
    name = 'generateTables1657892820540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_2fa156db4d5e9c2646fdbf60d8a"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_2fa156db4d5e9c2646fdbf60d8a" UNIQUE ("providerId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
