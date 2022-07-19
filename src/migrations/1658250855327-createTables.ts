import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1658250855327 implements MigrationInterface {
    name = 'createTables1658250855327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fantasy_name" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "cnpj" character varying(14) NOT NULL, "ie" character varying(9) NOT NULL, "street" character varying(256) NOT NULL, "number" integer NOT NULL, "complement" character varying(256), "district" character varying(256) NOT NULL, "city" character varying(256) NOT NULL, "state" character varying(2) NOT NULL, "country" character varying(256) NOT NULL, "zip_code" character varying(10) NOT NULL, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_price" numeric(10,2) NOT NULL, "status" character varying(50) NOT NULL, "providerId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "qtd" integer NOT NULL, "supplyId" uuid, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supply" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "buy_price" numeric(10,2) NOT NULL, "qtd" integer, CONSTRAINT "PK_11dcdc2def0eb6d10ed3ae0180d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "price" numeric(10,2) NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(128) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "number" character varying NOT NULL, "street" character varying(256) NOT NULL, "complement" character varying(256) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" character varying(2) NOT NULL, "zip_code" character varying NOT NULL, "country" character varying(256) NOT NULL, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(256) NOT NULL, "isAdm" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_supplies_supply" ("ordersId" uuid NOT NULL, "supplyId" uuid NOT NULL, CONSTRAINT "PK_f33d419e1f6e6c2bb86842ad615" PRIMARY KEY ("ordersId", "supplyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06685b5d38c88848a25db50a3d" ON "orders_supplies_supply" ("ordersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11dbae20b89ba71ff1bd500cba" ON "orders_supplies_supply" ("supplyId") `);
        await queryRunner.query(`CREATE TABLE "supply_provider_providers" ("supplyId" uuid NOT NULL, "providersId" uuid NOT NULL, CONSTRAINT "PK_11b0e6945a1a685b8863d8d5fde" PRIMARY KEY ("supplyId", "providersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0f65057d880a475682b8fd6e0" ON "supply_provider_providers" ("supplyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e8efa67b509d44179bd084e0b" ON "supply_provider_providers" ("providersId") `);
        await queryRunner.query(`CREATE TABLE "supply_orders_orders" ("supplyId" uuid NOT NULL, "ordersId" uuid NOT NULL, CONSTRAINT "PK_585907f522395cec4f3a6fbe527" PRIMARY KEY ("supplyId", "ordersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e156b794e83d1382baf8c57dd" ON "supply_orders_orders" ("supplyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b46f6c1f080b11c685903a965d" ON "supply_orders_orders" ("ordersId") `);
        await queryRunner.query(`CREATE TABLE "product_supplies_supply" ("productId" uuid NOT NULL, "supplyId" uuid NOT NULL, CONSTRAINT "PK_2b2c2d52b90fe15924c44f014d4" PRIMARY KEY ("productId", "supplyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e65f7d45041da29b0019e83915" ON "product_supplies_supply" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b73f68efbba26c0e5b02655214" ON "product_supplies_supply" ("supplyId") `);
        await queryRunner.query(`CREATE TABLE "cart_products_product" ("cartId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_785ab9c1dbede19ef42bf12280b" PRIMARY KEY ("cartId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e6ce39be5d354954a88ded1eba" ON "cart_products_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fc996e42b6330c97f8cffbddf" ON "cart_products_product" ("productId") `);
        await queryRunner.query(`CREATE TABLE "ticket_products_product" ("ticketId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_d6bbee6390c8c385e5be5f57fd6" PRIMARY KEY ("ticketId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e2becb7e672183b17ca5c4ae1" ON "ticket_products_product" ("ticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_efb461dff66d04e1d10f600a73" ON "ticket_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2e200c99875b2e0378b8af076b0" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" ADD CONSTRAINT "FK_06685b5d38c88848a25db50a3d0" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" ADD CONSTRAINT "FK_11dbae20b89ba71ff1bd500cba9" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_e0f65057d880a475682b8fd6e0f" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" ADD CONSTRAINT "FK_9e156b794e83d1382baf8c57dd0" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" ADD CONSTRAINT "FK_b46f6c1f080b11c685903a965da" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_supplies_supply" ADD CONSTRAINT "FK_e65f7d45041da29b0019e83915c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_supplies_supply" ADD CONSTRAINT "FK_b73f68efbba26c0e5b02655214b" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" ADD CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" ADD CONSTRAINT "FK_0e2becb7e672183b17ca5c4ae10" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" ADD CONSTRAINT "FK_efb461dff66d04e1d10f600a73d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_products_product" DROP CONSTRAINT "FK_efb461dff66d04e1d10f600a73d"`);
        await queryRunner.query(`ALTER TABLE "ticket_products_product" DROP CONSTRAINT "FK_0e2becb7e672183b17ca5c4ae10"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_0fc996e42b6330c97f8cffbddfa"`);
        await queryRunner.query(`ALTER TABLE "cart_products_product" DROP CONSTRAINT "FK_e6ce39be5d354954a88ded1ebac"`);
        await queryRunner.query(`ALTER TABLE "product_supplies_supply" DROP CONSTRAINT "FK_b73f68efbba26c0e5b02655214b"`);
        await queryRunner.query(`ALTER TABLE "product_supplies_supply" DROP CONSTRAINT "FK_e65f7d45041da29b0019e83915c"`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" DROP CONSTRAINT "FK_b46f6c1f080b11c685903a965da"`);
        await queryRunner.query(`ALTER TABLE "supply_orders_orders" DROP CONSTRAINT "FK_9e156b794e83d1382baf8c57dd0"`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3"`);
        await queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_e0f65057d880a475682b8fd6e0f"`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" DROP CONSTRAINT "FK_11dbae20b89ba71ff1bd500cba9"`);
        await queryRunner.query(`ALTER TABLE "orders_supplies_supply" DROP CONSTRAINT "FK_06685b5d38c88848a25db50a3d0"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2e200c99875b2e0378b8af076b0"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a"`);
        await queryRunner.query(`DROP INDEX "IDX_efb461dff66d04e1d10f600a73"`);
        await queryRunner.query(`DROP INDEX "IDX_0e2becb7e672183b17ca5c4ae1"`);
        await queryRunner.query(`DROP TABLE "ticket_products_product"`);
        await queryRunner.query(`DROP INDEX "IDX_0fc996e42b6330c97f8cffbddf"`);
        await queryRunner.query(`DROP INDEX "IDX_e6ce39be5d354954a88ded1eba"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`DROP INDEX "IDX_b73f68efbba26c0e5b02655214"`);
        await queryRunner.query(`DROP INDEX "IDX_e65f7d45041da29b0019e83915"`);
        await queryRunner.query(`DROP TABLE "product_supplies_supply"`);
        await queryRunner.query(`DROP INDEX "IDX_b46f6c1f080b11c685903a965d"`);
        await queryRunner.query(`DROP INDEX "IDX_9e156b794e83d1382baf8c57dd"`);
        await queryRunner.query(`DROP TABLE "supply_orders_orders"`);
        await queryRunner.query(`DROP INDEX "IDX_4e8efa67b509d44179bd084e0b"`);
        await queryRunner.query(`DROP INDEX "IDX_e0f65057d880a475682b8fd6e0"`);
        await queryRunner.query(`DROP TABLE "supply_provider_providers"`);
        await queryRunner.query(`DROP INDEX "IDX_11dbae20b89ba71ff1bd500cba"`);
        await queryRunner.query(`DROP INDEX "IDX_06685b5d38c88848a25db50a3d"`);
        await queryRunner.query(`DROP TABLE "orders_supplies_supply"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "supply"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "providers"`);
    }

}
