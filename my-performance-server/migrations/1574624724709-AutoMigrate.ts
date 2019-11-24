import {MigrationInterface, QueryRunner} from "typeorm";

export class AutoMigrate1574624724709 implements MigrationInterface {
    name = 'AutoMigrate1574624724709'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "performance_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, "distance" integer NOT NULL, "energy" integer NOT NULL, "calories" integer NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_aaecc92d9233a40275af0db6874" UNIQUE ("date"), CONSTRAINT "PK_7be03a5dbab9789d9663fe6cbd1" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_73b9058bd5be594af17757249b" ON "performance_entry" ("userId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_73b9058bd5be594af17757249b"`, undefined);
        await queryRunner.query(`DROP TABLE "performance_entry"`, undefined);
    }

}
