import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_audit_log_type" RENAME TO "enum_logs_type";
  ALTER TABLE "audit_log" RENAME TO "logs";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "audit_log_id" TO "logs_id";
  ALTER TABLE "logs" DROP CONSTRAINT "audit_log_user_id_users_id_fk";
  
  ALTER TABLE "logs" DROP CONSTRAINT "audit_log_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audit_log_fk";
  
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_query_presets_related_collection";
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('users', 'sessions', 'accounts', 'verifications', 'admin-invitations', 'orders', 'files', 'tags', 'logs', 'payload-jobs');
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE "public"."enum_payload_query_presets_related_collection" USING "related_collection"::"public"."enum_payload_query_presets_related_collection";
  DROP INDEX "audit_log_user_idx";
  DROP INDEX "audit_log_folder_idx";
  DROP INDEX "payload_locked_documents_rels_audit_log_id_idx";
  ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "logs" ADD CONSTRAINT "logs_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logs_fk" FOREIGN KEY ("logs_id") REFERENCES "public"."logs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "logs_user_idx" ON "logs" USING btree ("user_id");
  CREATE INDEX "logs_folder_idx" ON "logs" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("logs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_logs_type" RENAME TO "enum_audit_log_type";
  ALTER TABLE "logs" RENAME TO "audit_log";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "logs_id" TO "audit_log_id";
  ALTER TABLE "audit_log" DROP CONSTRAINT "logs_user_id_users_id_fk";
  
  ALTER TABLE "audit_log" DROP CONSTRAINT "logs_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_logs_fk";
  
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_query_presets_related_collection";
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('users', 'sessions', 'accounts', 'verifications', 'admin-invitations', 'orders', 'files', 'tags', 'Audit-log', 'payload-jobs');
  ALTER TABLE "payload_query_presets" ALTER COLUMN "related_collection" SET DATA TYPE "public"."enum_payload_query_presets_related_collection" USING "related_collection"::"public"."enum_payload_query_presets_related_collection";
  DROP INDEX "logs_user_idx";
  DROP INDEX "logs_folder_idx";
  DROP INDEX "payload_locked_documents_rels_logs_id_idx";
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "audit_log_user_idx" ON "audit_log" USING btree ("user_id");
  CREATE INDEX "audit_log_folder_idx" ON "audit_log" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_audit_log_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_log_id");`)
}
