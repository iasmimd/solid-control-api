"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinAllRelations1657898404899 = void 0;
class joinAllRelations1657898404899 {
    constructor() {
        this.name = 'joinAllRelations1657898404899';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_470e53fb414cf1104837c1b8364"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying(256) NOT NULL, "password" character varying(128) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "cartId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_342497b574edb2309ec8c6b62a" UNIQUE ("cartId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user_address_address" ("userId" uuid NOT NULL, "addressId" uuid NOT NULL, CONSTRAINT "PK_33c1cc93f3f8ffbd67c93d7a847" PRIMARY KEY ("userId", "addressId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_b3641446351e94089ba80de503" ON "user_address_address" ("userId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_c3ca130325607a626583e7e9c4" ON "user_address_address" ("addressId") `);
            yield queryRunner.query(`CREATE TABLE "user_tickets_ticket" ("userId" uuid NOT NULL, "ticketId" uuid NOT NULL, CONSTRAINT "PK_9791a265518865bdfdf5733650b" PRIMARY KEY ("userId", "ticketId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_49e715d772ad42c8be0141d9fc" ON "user_tickets_ticket" ("userId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_fc4380f469df9ca647ccbe69ae" ON "user_tickets_ticket" ("ticketId") `);
            yield queryRunner.query(`CREATE TABLE "address_user_id_user" ("addressId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_02e448f3f49f3b1c2cc2463c912" PRIMARY KEY ("addressId", "userId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_23dc751091431a0d09e9b72564" ON "address_user_id_user" ("addressId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_a971fdccf75a9c20ed29df204d" ON "address_user_id_user" ("userId") `);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "providerId" uuid`);
            yield queryRunner.query(`ALTER TABLE "supply" ADD "qtd" integer`);
            yield queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3"`);
            yield queryRunner.query(`ALTER TABLE "providers" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_470e53fb414cf1104837c1b8364" FOREIGN KEY ("cartId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_address_address" ADD CONSTRAINT "FK_b3641446351e94089ba80de5034" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_address_address" ADD CONSTRAINT "FK_c3ca130325607a626583e7e9c41" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_tickets_ticket" ADD CONSTRAINT "FK_49e715d772ad42c8be0141d9fc4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_tickets_ticket" ADD CONSTRAINT "FK_fc4380f469df9ca647ccbe69aec" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "address_user_id_user" ADD CONSTRAINT "FK_23dc751091431a0d09e9b725642" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "address_user_id_user" ADD CONSTRAINT "FK_a971fdccf75a9c20ed29df204df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address_user_id_user" DROP CONSTRAINT "FK_a971fdccf75a9c20ed29df204df"`);
            yield queryRunner.query(`ALTER TABLE "address_user_id_user" DROP CONSTRAINT "FK_23dc751091431a0d09e9b725642"`);
            yield queryRunner.query(`ALTER TABLE "user_tickets_ticket" DROP CONSTRAINT "FK_fc4380f469df9ca647ccbe69aec"`);
            yield queryRunner.query(`ALTER TABLE "user_tickets_ticket" DROP CONSTRAINT "FK_49e715d772ad42c8be0141d9fc4"`);
            yield queryRunner.query(`ALTER TABLE "user_address_address" DROP CONSTRAINT "FK_c3ca130325607a626583e7e9c41"`);
            yield queryRunner.query(`ALTER TABLE "user_address_address" DROP CONSTRAINT "FK_b3641446351e94089ba80de5034"`);
            yield queryRunner.query(`ALTER TABLE "supply_provider_providers" DROP CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
            yield queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_470e53fb414cf1104837c1b8364"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2fa156db4d5e9c2646fdbf60d8a"`);
            yield queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isAdm" SET DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "providers" ALTER COLUMN "id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "supply_provider_providers" ADD CONSTRAINT "FK_4e8efa67b509d44179bd084e0b3" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "supply" DROP COLUMN "qtd"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "providerId"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "cartId" uuid`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_89502c44bd22c06e714c31c1e93" UNIQUE ("cartId")`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_a971fdccf75a9c20ed29df204d"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_23dc751091431a0d09e9b72564"`);
            yield queryRunner.query(`DROP TABLE "address_user_id_user"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_fc4380f469df9ca647ccbe69ae"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_49e715d772ad42c8be0141d9fc"`);
            yield queryRunner.query(`DROP TABLE "user_tickets_ticket"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c3ca130325607a626583e7e9c4"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_b3641446351e94089ba80de503"`);
            yield queryRunner.query(`DROP TABLE "user_address_address"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_470e53fb414cf1104837c1b8364" FOREIGN KEY ("cartId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.joinAllRelations1657898404899 = joinAllRelations1657898404899;
