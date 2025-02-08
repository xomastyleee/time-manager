import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePreferencesUserTable1707420000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "user"
      SET "preferences" = '{}'
      WHERE "preferences" NOT LIKE '{%'
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "user"
      SET "preferences" = NULL
      WHERE "preferences" = '{}'
    `)
  }
}
