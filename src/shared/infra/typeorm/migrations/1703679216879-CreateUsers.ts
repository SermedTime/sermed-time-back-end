import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsers1703679216879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "TB_USUA" (
      "ID" NUMBER NOT NULL,
      "UUID" RAW(16) UNIQUE NOT NULL,
      "PR_NOME" VARCHAR2(100) NOT NULL,
      "SB_NOME" VARCHAR2(100) NOT NULL,
      "NM_SOCI" VARCHAR2(100),
      "NR_PIS" VARCHAR2(11) UNIQUE NOT NULL,
      "NR_CPF" VARCHAR2(11) UNIQUE NOT NULL,
      "CD_FUNC" VARCHAR2(100) UNIQUE NOT NULL,
      "DS_MAIL" VARCHAR2(100) UNIQUE NOT NULL,
      "CD_SENH" VARCHAR2(512) NOT NULL,
      "CD_SENH_TEMP" NUMBER(1, 0) DEFAULT 1 NOT NULL,
      "IN_SUPE" NUMBER(1, 0) DEFAULT 1 NOT NULL,
      "IN_STAT" NUMBER(1, 0) DEFAULT 1 NOT NULL,
      PRIMARY KEY ("ID"),
      CHECK (LENGTH("NR_PIS") = 11),
      CHECK (LENGTH("NR_CPF") = 11),
      CHECK ("CD_SENH_TEMP" IN (0, 1)),
      CHECK ("IN_SUPE" IN (0, 1)),
      CHECK ("IN_STAT" IN (0, 1))
    )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE "TB_USUA"
    `)
  }
}
