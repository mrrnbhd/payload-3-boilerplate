import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_payload_query_presets_related_collection" ADD VALUE 'Audit-log';
  ALTER TYPE "public"."enum_payload_query_presets_related_collection" ADD VALUE 'payload-jobs';
  ALTER TABLE "audit_log" ADD COLUMN "folder_id" uuid;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "audit_log_folder_idx" ON "audit_log" USING btree ("folder_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "audit_log" DROP CONSTRAINT "audit_log_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_query_presets_related_collection";
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('users', 'sessions', 'accounts', 'verifications', 'admin-invitations', 'orders', 'files', 'tags');
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE "public"."enum_payload_query_presets_related_collection" USING "related_collection"::"public"."enum_payload_query_presets_related_collection";
  DROP INDEX "audit_log_folder_idx";
  ALTER TABLE "audit_log" DROP COLUMN "folder_id";`)
}
