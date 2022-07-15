import { MigrationInterface, QueryRunner } from "typeorm";

export class generateTables1657844066687 implements MigrationInterface {
    name = 'generateTables1657844066687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fantasy_name" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "cnpj" character varying(14) NOT NULL, "ie" character varying(9) NOT NULL, "street" character varying(256) NOT NULL, "number" integer NOT NULL, "complement" character varying(256), "district" character varying(256) NOT NULL, "city" character varying(256) NOT NULL, "state" character varying(2) NOT NULL, "country" character varying(256) NOT NULL, "zip_code" character varying(10) NOT NULL, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_price" numeric(10,2) NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_supplies_supply" ("ordersId" uuid NOT NULL, "supplyId" uuid NOT NULL, CONSTRAINT "PK_f33d419e1f6e6c2bb86842ad615" PRIMARY KEY ("ordersId", "supplyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06685b5d38c88848a25db50a3d" ON "orders_supplies_supply" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11dbae20b89ba71ff1bd500cba" ON "orders_supplies_supply" ("supplyId") `);
        await queryRunner.query(`CREATE TABLE "orders_provider_providers" ("ordersId" uuid NOT NULL, "providersId" uuid NOT NULL, CONSTRAINT "PK_5af17798da5299b858898a1f69f" PRIMARY KEY ("ordersId", "providersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f56f246cf595fac032065f264" ON "orders_provider_providers" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c74a55c1e38828a5ec048abb0" ON "orders_provider_providers" ("providersId") `);
        await queryRunner.query(`CREATE TABLE "supply_provider_providers" ("supplyId" uuid NOT NULL, "providersId" uuid NOT NULL, CONSTRAINT "PK_11b0e6945a1a685b8863d8d5fde" PRIMARY KEY ("supplyId", "providersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0f65057d880a475682b8fd6e0" ON "supply_provider_providers" ("supplyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e8efa67b509d44179bd084e0b" ON "supply_provider_providers" ("providersId") `);
        await queryRunner.query(`CREATE TABLE "supply_orders_orders" ("supplyId" uuid NOT NULL, "ordersId" uuid NOT NULL, CONSTRAINT "PK_585907f522395cec4f3a6fbe527" PRIMARY KEY ("supplyId", "ordersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e156b794e83d1382baf8c57dd" ON "supply_orders_orders" ("supplyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b46f6c1f080b11c685903a965d" ON "supply_orders_orders" ("ordersId") `);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" ADD CONSTRAINT "FK_06685b5d38c88848a25db50a3d0" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" ADD CONSTRAINT "FK_11dbae20b89ba71ff1bd500cba9" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_provider_providers" ADD CONSTRAINT "FK_8f56f246cf595fac032065f264d" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_provider_providers" ADD CONSTRAINT "FK_7c74a55c1e38828a5ec048abb0d" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_e0f65057d880a475682b8fd6e0f" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" ADD CONSTRAINT "FK_9e156b794e83d1382baf8c57dd0" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" ADD CONSTRAINT "FK_b46f6c1f080b11c685903a965da" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" DROP CONSTRAINT "FK_b46f6c1f080b11c685903a965da"`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" DROP CONSTRAINT "FK_9e156b794e83d1382baf8c57dd0"`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3"`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_e0f65057d880a475682b8fd6e0f"`);
        await queryRunner.query(`ALTER TABLE "orders_provider_providers" DROP CONSTRAINT "FK_7c74a55c1e38828a5ec048abb0d"`);
        await queryRunner.query(`ALTER TABLE "orders_provider_providers" DROP CONSTRAINT "FK_8f56f246cf595fac032065f264d"`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" DROP CONSTRAINT "FK_11dbae20b89ba71ff1bd500cba9"`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" DROP CONSTRAINT "FK_06685b5d38c88848a25db50a3d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b46f6c1f080b11c685903a965d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e156b794e83d1382baf8c57dd"`);
        await queryRunner.query(`DROP TABLE "supply_orders_orders"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e8efa67b509d44179bd084e0b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0f65057d880a475682b8fd6e0"`);
        await queryRunner.query(`DROP TABLE "supply_provider_providers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c74a55c1e38828a5ec048abb0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f56f246cf595fac032065f264"`);
        await queryRunner.query(`DROP TABLE "orders_provider_providers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11dbae20b89ba71ff1bd500cba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06685b5d38c88848a25db50a3d"`);
        await queryRunner.query(`DROP TABLE "orders_supplies_supply"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "providers"`);
    }

}
