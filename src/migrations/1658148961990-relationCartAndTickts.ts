import { MigrationInterface, QueryRunner } from "typeorm";

export class relationCartAndTickts1658148961990 implements MigrationInterface {
    name = 'relationCartAndTickts1658148961990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fantasy_name" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "cnpj" character varying(14) NOT NULL, "ie" character varying(9) NOT NULL, "street" character varying(256) NOT NULL, "number" integer NOT NULL, "complement" character varying(256), "district" character varying(256) NOT NULL, "city" character varying(256) NOT NULL, "state" character varying(2) NOT NULL, "country" character varying(256) NOT NULL, "zip_code" character varying(10) NOT NULL, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_price" numeric(10,2) NOT NULL, "status" character varying(50) NOT NULL, "providerId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supply" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "buy_price" numeric(10,2) NOT NULL, "qtd" integer, CONSTRAINT "PK_11dcdc2def0eb6d10ed3ae0180d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "price" numeric(10,2) NOT NULL, "img" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "cartId" uuid, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(128) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "number" integer NOT NULL, "street" character varying(256) NOT NULL, "complement" character varying(256) NOT NULL, "state" character varying(2) NOT NULL, "zip_code" integer NOT NULL, "country" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "qtd" integer NOT NULL, "supplyIdId" uuid, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`CREATE TABLE "user_address_address" ("userId" uuid NOT NULL, "addressId" uuid NOT NULL, CONSTRAINT "PK_33c1cc93f3f8ffbd67c93d7a847" PRIMARY KEY ("userId", "addressId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3641446351e94089ba80de503" ON "user_address_address" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3ca130325607a626583e7e9c4" ON "user_address_address" ("addressId") `);
        await queryRunner.query(`CREATE TABLE "address_user_id_user" ("addressId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_02e448f3f49f3b1c2cc2463c912" PRIMARY KEY ("addressId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23dc751091431a0d09e9b72564" ON "address_user_id_user" ("addressId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a971fdccf75a9c20ed29df204d" ON "address_user_id_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_0e01a7c92f008418bad6bad5919" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_470e53fb414cf1104837c1b8364" FOREIGN KEY ("cartId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_73259b799fbc3b4902c0441cc46" FOREIGN KEY ("supplyIdId") REFERENCES "supply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "user_address_address" ADD CONSTRAINT "FK_b3641446351e94089ba80de5034" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_address_address" ADD CONSTRAINT "FK_c3ca130325607a626583e7e9c41" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "address_user_id_user" ADD CONSTRAINT "FK_23dc751091431a0d09e9b725642" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "address_user_id_user" ADD CONSTRAINT "FK_a971fdccf75a9c20ed29df204df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_user_id_user" DROP CONSTRAINT "FK_a971fdccf75a9c20ed29df204df"`);
        await queryRunner.query(`ALTER TABLE "address_user_id_user" DROP CONSTRAINT "FK_23dc751091431a0d09e9b725642"`);
        await queryRunner.query(`ALTER TABLE "user_address_address" DROP CONSTRAINT "FK_c3ca130325607a626583e7e9c41"`);
        await queryRunner.query(`ALTER TABLE "user_address_address" DROP CONSTRAINT "FK_b3641446351e94089ba80de5034"`);
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
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_73259b799fbc3b4902c0441cc46"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_470e53fb414cf1104837c1b8364"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_0e01a7c92f008418bad6bad5919"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a971fdccf75a9c20ed29df204d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23dc751091431a0d09e9b72564"`);
        await queryRunner.query(`DROP TABLE "address_user_id_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3ca130325607a626583e7e9c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3641446351e94089ba80de503"`);
        await queryRunner.query(`DROP TABLE "user_address_address"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fc996e42b6330c97f8cffbddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6ce39be5d354954a88ded1eba"`);
        await queryRunner.query(`DROP TABLE "cart_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b73f68efbba26c0e5b02655214"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e65f7d45041da29b0019e83915"`);
        await queryRunner.query(`DROP TABLE "product_supplies_supply"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b46f6c1f080b11c685903a965d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e156b794e83d1382baf8c57dd"`);
        await queryRunner.query(`DROP TABLE "supply_orders_orders"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e8efa67b509d44179bd084e0b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0f65057d880a475682b8fd6e0"`);
        await queryRunner.query(`DROP TABLE "supply_provider_providers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11dbae20b89ba71ff1bd500cba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06685b5d38c88848a25db50a3d"`);
        await queryRunner.query(`DROP TABLE "orders_supplies_supply"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "stock"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "supply"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "providers"`);
    }

}
