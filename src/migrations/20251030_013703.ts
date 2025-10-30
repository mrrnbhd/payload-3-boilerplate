import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "settings_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "settings_rels" CASCADE;
  ALTER TABLE "settings" ADD COLUMN "proxy_server" varchar;
  ALTER TABLE "settings" ADD COLUMN "accounts_id" uuid;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_accounts_id_files_id_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "settings_accounts_idx" ON "settings" USING btree ("accounts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "settings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"files_id" uuid
  );
  
  ALTER TABLE "settings" DROP CONSTRAINT "settings_accounts_id_files_id_fk";
  
  DROP INDEX "settings_accounts_idx";
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_files_fk" FOREIGN KEY ("files_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "settings_rels_order_idx" ON "settings_rels" USING btree ("order");
  CREATE INDEX "settings_rels_parent_idx" ON "settings_rels" USING btree ("parent_id");
  CREATE INDEX "settings_rels_path_idx" ON "settings_rels" USING btree ("path");
  CREATE INDEX "settings_rels_files_id_idx" ON "settings_rels" USING btree ("files_id");
  ALTER TABLE "settings" DROP COLUMN "proxy_server";
  ALTER TABLE "settings" DROP COLUMN "accounts_id";`)
}
