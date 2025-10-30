import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" ALTER COLUMN "proxy_login" SET DEFAULT '';
  ALTER TABLE "settings" ALTER COLUMN "proxy_login" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_password" SET DEFAULT '';
  ALTER TABLE "settings" ALTER COLUMN "proxy_password" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_host" SET DEFAULT '';
  ALTER TABLE "settings" ALTER COLUMN "proxy_host" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" SET DATA TYPE numeric;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" SET DEFAULT 10000;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_uploader_id" SET NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_data" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" ALTER COLUMN "proxy_login" DROP DEFAULT;
  ALTER TABLE "settings" ALTER COLUMN "proxy_login" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_password" DROP DEFAULT;
  ALTER TABLE "settings" ALTER COLUMN "proxy_password" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_host" DROP DEFAULT;
  ALTER TABLE "settings" ALTER COLUMN "proxy_host" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" SET DATA TYPE varchar;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" DROP DEFAULT;
  ALTER TABLE "settings" ALTER COLUMN "proxy_port" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_uploader_id" DROP NOT NULL;
  ALTER TABLE "settings" ALTER COLUMN "account_data" DROP NOT NULL;`)
}
