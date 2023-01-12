import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingrelationsmedicspeciality1673533333534 implements MigrationInterface {
    name = 'fixingrelationsmedicspeciality1673533333534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`CREATE TABLE "user_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(200) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(5) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_medic" DROP CONSTRAINT "FK_a7d98a5714550a31f570b6c90da"`);
        await queryRunner.query(`ALTER TABLE "user_medic" DROP CONSTRAINT "REL_a7d98a5714550a31f570b6c90d"`);
        await queryRunner.query(`ALTER TABLE "user_medic" ADD CONSTRAINT "FK_a7d98a5714550a31f570b6c90da" FOREIGN KEY ("specialityId") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "user_address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user_medic" DROP CONSTRAINT "FK_a7d98a5714550a31f570b6c90da"`);
        await queryRunner.query(`ALTER TABLE "user_medic" ADD CONSTRAINT "REL_a7d98a5714550a31f570b6c90d" UNIQUE ("specialityId")`);
        await queryRunner.query(`ALTER TABLE "user_medic" ADD CONSTRAINT "FK_a7d98a5714550a31f570b6c90da" FOREIGN KEY ("specialityId") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "user_address"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
