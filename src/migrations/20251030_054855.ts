import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" RENAME COLUMN "accounts_id" TO "accounts_csv_id";
  ALTER TABLE "settings" DROP CONSTRAINT "settings_accounts_id_files_id_fk";
  
  DROP INDEX "settings_accounts_idx";
  ALTER TABLE "settings" ADD COLUMN "accounts_data" jsonb;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_accounts_csv_id_files_id_fk" FOREIGN KEY ("accounts_csv_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_accounts_csv_idx" ON "settings" USING btree ("accounts_csv_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings" RENAME COLUMN "accounts_csv_id" TO "accounts_id";
  ALTER TABLE "settings" DROP CONSTRAINT "settings_accounts_csv_id_files_id_fk";
  
  DROP INDEX "settings_accounts_csv_idx";
  ALTER TABLE "settings" ADD CONSTRAINT "settings_accounts_id_files_id_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_accounts_idx" ON "settings" USING btree ("accounts_id");
  ALTER TABLE "settings" DROP COLUMN "accounts_data";`)
}
