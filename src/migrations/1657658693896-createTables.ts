import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1657658693896 implements MigrationInterface {
    name = 'createTables1657658693896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "providers" ("id" uuid NOT NULL, "fantasy_name" character varying(256) NOT NULL, "name" character varying(256) NOT NULL, "cnpj" character varying(14) NOT NULL, "ie" character varying(9) NOT NULL, "street" character varying(256) NOT NULL, "number" integer NOT NULL, "complement" character varying(256), "district" character varying(256) NOT NULL, "city" character varying(256) NOT NULL, "state" character varying(2) NOT NULL, "country" character varying(256) NOT NULL, "zip_code" character varying(10) NOT NULL, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "providers"`);
    }

}
