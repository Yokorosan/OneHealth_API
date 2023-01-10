import { MigrationInterface, QueryRunner } from "typeorm";

export class creatingtables1673364957851 implements MigrationInterface {
    name = 'creatingtables1673364957851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(200) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(5) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "speciality" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_cfdbcfa372a34f2d9c1d5180052" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_medic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(75) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(20) NOT NULL, "phone" character varying(15) NOT NULL, "isWhatsApp" boolean NOT NULL DEFAULT true, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressId" uuid NOT NULL, "specialityId" uuid NOT NULL, CONSTRAINT "REL_4f22701c22147f1492e8baab29" UNIQUE ("addressId"), CONSTRAINT "REL_a7d98a5714550a31f570b6c90d" UNIQUE ("specialityId"), CONSTRAINT "PK_2f4159e05099a63620b5506350c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diagnostic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "date" date NOT NULL, "description" text NOT NULL, "pacientId" uuid, "medicId" uuid, CONSTRAINT "PK_98c9b0b51c24cd981d15ee3091b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(75) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(20) NOT NULL, "phone" character varying(15) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressId" uuid, CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scheduled_appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(20) NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "medicId" uuid, CONSTRAINT "PK_b947d59cd88e872b295c6e4069a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_medic" ADD CONSTRAINT "FK_4f22701c22147f1492e8baab29f" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_medic" ADD CONSTRAINT "FK_a7d98a5714550a31f570b6c90da" FOREIGN KEY ("specialityId") REFERENCES "speciality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostic" ADD CONSTRAINT "FK_1e2a5a381c30d7761d9c7774cfc" FOREIGN KEY ("pacientId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diagnostic" ADD CONSTRAINT "FK_7fc58690b3aa7b8bc35b6f21b37" FOREIGN KEY ("medicId") REFERENCES "user_medic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled_appointment" ADD CONSTRAINT "FK_71edf25b68290b5ff7df9b6cba7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled_appointment" ADD CONSTRAINT "FK_78466c84e7022221117dff427fb" FOREIGN KEY ("medicId") REFERENCES "user_medic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scheduled_appointment" DROP CONSTRAINT "FK_78466c84e7022221117dff427fb"`);
        await queryRunner.query(`ALTER TABLE "scheduled_appointment" DROP CONSTRAINT "FK_71edf25b68290b5ff7df9b6cba7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "diagnostic" DROP CONSTRAINT "FK_7fc58690b3aa7b8bc35b6f21b37"`);
        await queryRunner.query(`ALTER TABLE "diagnostic" DROP CONSTRAINT "FK_1e2a5a381c30d7761d9c7774cfc"`);
        await queryRunner.query(`ALTER TABLE "user_medic" DROP CONSTRAINT "FK_a7d98a5714550a31f570b6c90da"`);
        await queryRunner.query(`ALTER TABLE "user_medic" DROP CONSTRAINT "FK_4f22701c22147f1492e8baab29f"`);
        await queryRunner.query(`DROP TABLE "scheduled_appointment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "diagnostic"`);
        await queryRunner.query(`DROP TABLE "user_medic"`);
        await queryRunner.query(`DROP TABLE "speciality"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
