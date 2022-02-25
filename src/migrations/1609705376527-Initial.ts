import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1609705376527 implements MigrationInterface {
    name = 'Initial1609705376527'

    public async up(queryRunner: QueryRunner): Promise<void> {
       //  await queryRunner.query(`CREATE TABLE "user" (
       //                                                    "id" int NOT NULL,
       //                                                    "last_name" varchar(255),
       //                                                    "first_name" varchar(255),
       //                                                    "email" varchar(255),
       //                                                    "password" varchar(255),
       //                                                    "phone" varchar(255),
       //                                                    PRIMARY KEY (id) )`
       //  );
       //
       //
       // await queryRunner.query(`CREATE TABLE "authority" (
       //                                    "id" int not null ,
       //                                    "name" varchar(255),
       //                                    PRIMARY KEY (id) )`
       // );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DROP TABLE "user"`);
        // await queryRunner.query(`DROP TABLE "authority"`);
    }

}
