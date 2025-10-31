import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_orders_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_orders_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_orders_v" CASCADE;
  DROP TABLE "_orders_v_rels" CASCADE;
  DROP INDEX "users_deleted_at_idx";
  DROP INDEX "sessions_deleted_at_idx";
  DROP INDEX "accounts_deleted_at_idx";
  DROP INDEX "verifications_deleted_at_idx";
  DROP INDEX "admin_invitations_deleted_at_idx";
  DROP INDEX "orders_deleted_at_idx";
  DROP INDEX "orders__status_idx";
  DROP INDEX "files_deleted_at_idx";
  ALTER TABLE "orders" ALTER COLUMN "order_number" SET NOT NULL;
  ALTER TABLE "orders" ALTER COLUMN "purchase_link" SET NOT NULL;
  ALTER TABLE "users" DROP COLUMN "deleted_at";
  ALTER TABLE "sessions" DROP COLUMN "deleted_at";
  ALTER TABLE "accounts" DROP COLUMN "deleted_at";
  ALTER TABLE "verifications" DROP COLUMN "deleted_at";
  ALTER TABLE "admin_invitations" DROP COLUMN "deleted_at";
  ALTER TABLE "orders" DROP COLUMN "enable_browser_view";
  ALTER TABLE "orders" DROP COLUMN "deleted_at";
  ALTER TABLE "orders" DROP COLUMN "_status";
  ALTER TABLE "files" DROP COLUMN "deleted_at";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum__orders_v_version_fulfillment_status";
  DROP TYPE "public"."enum__orders_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__orders_v_version_fulfillment_status" AS ENUM('Pending', 'Queued', 'Running', 'Purchased', 'Fulfilled', 'Error');
  CREATE TYPE "public"."enum__orders_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_orders_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_fulfillment_status" "enum__orders_v_version_fulfillment_status" DEFAULT 'Pending',
  	"version_order_value" numeric,
  	"version_order_link" varchar,
  	"version_order_number" varchar,
  	"version_purchase_and_fulfill" boolean,
  	"version_enable_browser_view" boolean,
  	"version_purchase_link" varchar,
  	"version_parking_location" varchar,
  	"version_projected_cost" numeric,
  	"version_actual_cost" numeric,
  	"version_purchase_pdf_id" uuid,
  	"version_order_notes" varchar,
  	"version_folder_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__orders_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_orders_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" uuid
  );
  
  ALTER TABLE "orders" ALTER COLUMN "order_number" DROP NOT NULL;
  ALTER TABLE "orders" ALTER COLUMN "purchase_link" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "sessions" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "accounts" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "verifications" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "admin_invitations" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "orders" ADD COLUMN "enable_browser_view" boolean;
  ALTER TABLE "orders" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "orders" ADD COLUMN "_status" "enum_orders_status" DEFAULT 'draft';
  ALTER TABLE "files" ADD COLUMN "deleted_at" timestamp(3) with time zone;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_parent_id_orders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_purchase_pdf_id_files_id_fk" FOREIGN KEY ("version_purchase_pdf_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v_rels" ADD CONSTRAINT "_orders_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_rels" ADD CONSTRAINT "_orders_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_orders_v_parent_idx" ON "_orders_v" USING btree ("parent_id");
  CREATE INDEX "_orders_v_version_version_purchase_pdf_idx" ON "_orders_v" USING btree ("version_purchase_pdf_id");
  CREATE INDEX "_orders_v_version_version_folder_idx" ON "_orders_v" USING btree ("version_folder_id");
  CREATE INDEX "_orders_v_version_version_updated_at_idx" ON "_orders_v" USING btree ("version_updated_at");
  CREATE INDEX "_orders_v_version_version_created_at_idx" ON "_orders_v" USING btree ("version_created_at");
  CREATE INDEX "_orders_v_version_version_deleted_at_idx" ON "_orders_v" USING btree ("version_deleted_at");
  CREATE INDEX "_orders_v_version_version__status_idx" ON "_orders_v" USING btree ("version__status");
  CREATE INDEX "_orders_v_created_at_idx" ON "_orders_v" USING btree ("created_at");
  CREATE INDEX "_orders_v_updated_at_idx" ON "_orders_v" USING btree ("updated_at");
  CREATE INDEX "_orders_v_latest_idx" ON "_orders_v" USING btree ("latest");
  CREATE INDEX "_orders_v_autosave_idx" ON "_orders_v" USING btree ("autosave");
  CREATE INDEX "_orders_v_rels_order_idx" ON "_orders_v_rels" USING btree ("order");
  CREATE INDEX "_orders_v_rels_parent_idx" ON "_orders_v_rels" USING btree ("parent_id");
  CREATE INDEX "_orders_v_rels_path_idx" ON "_orders_v_rels" USING btree ("path");
  CREATE INDEX "_orders_v_rels_tags_id_idx" ON "_orders_v_rels" USING btree ("tags_id");
  CREATE INDEX "users_deleted_at_idx" ON "users" USING btree ("deleted_at");
  CREATE INDEX "sessions_deleted_at_idx" ON "sessions" USING btree ("deleted_at");
  CREATE INDEX "accounts_deleted_at_idx" ON "accounts" USING btree ("deleted_at");
  CREATE INDEX "verifications_deleted_at_idx" ON "verifications" USING btree ("deleted_at");
  CREATE INDEX "admin_invitations_deleted_at_idx" ON "admin_invitations" USING btree ("deleted_at");
  CREATE INDEX "orders_deleted_at_idx" ON "orders" USING btree ("deleted_at");
  CREATE INDEX "orders__status_idx" ON "orders" USING btree ("_status");
  CREATE INDEX "files_deleted_at_idx" ON "files" USING btree ("deleted_at");`)
}
