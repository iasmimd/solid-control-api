import { MigrationInterface, QueryRunner } from "typeorm";

export class relationProductsInTicket1658149615965 implements MigrationInterface {
    name = 'relationProductsInTicket1658149615965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_products_product" ("ticketId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_d6bbee6390c8c385e5be5f57fd6" PRIMARY KEY ("ticketId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e2becb7e672183b17ca5c4ae1" ON "ticket_products_product" ("ticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_efb461dff66d04e1d10f600a73" ON "ticket_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" ADD CONSTRAINT "FK_0e2becb7e672183b17ca5c4ae10" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" ADD CONSTRAINT "FK_efb461dff66d04e1d10f600a73d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_products_product" DROP CONSTRAINT "FK_efb461dff66d04e1d10f600a73d"`);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" DROP CONSTRAINT "FK_0e2becb7e672183b17ca5c4ae10"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_efb461dff66d04e1d10f600a73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e2becb7e672183b17ca5c4ae1"`);
        await queryRunner.query(`DROP TABLE "ticket_products_product"`);
    }

}
