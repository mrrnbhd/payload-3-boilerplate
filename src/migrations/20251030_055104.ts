import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" RENAME COLUMN "accounts_upload_id" TO "account_uploader_id";
  ALTER TABLE "settings" RENAME COLUMN "accounts_data" TO "account_data";
  ALTER TABLE "settings" DROP CONSTRAINT "settings_accounts_upload_id_files_id_fk";
  
  DROP INDEX "settings_accounts_upload_idx";
  ALTER TABLE "settings" ADD CONSTRAINT "settings_account_uploader_id_files_id_fk" FOREIGN KEY ("account_uploader_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_account_uploader_idx" ON "settings" USING btree ("account_uploader_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" RENAME COLUMN "account_uploader_id" TO "accounts_upload_id";
  ALTER TABLE "settings" RENAME COLUMN "account_data" TO "accounts_data";
  ALTER TABLE "settings" DROP CONSTRAINT "settings_account_uploader_id_files_id_fk";
  
  DROP INDEX "settings_account_uploader_idx";
  ALTER TABLE "settings" ADD CONSTRAINT "settings_accounts_upload_id_files_id_fk" FOREIGN KEY ("accounts_upload_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_accounts_upload_idx" ON "settings" USING btree ("accounts_upload_id");`)
}
