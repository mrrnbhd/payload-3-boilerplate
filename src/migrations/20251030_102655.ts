import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" ALTER COLUMN "account_uploader_id" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_data" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" ALTER COLUMN "account_uploader_id" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_data" SET NOT NULL;`)
}
