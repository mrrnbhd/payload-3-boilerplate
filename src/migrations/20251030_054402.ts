import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" RENAME COLUMN "browser_view" TO "enable_browser_view";
  ALTER TABLE "orders" RENAME COLUMN "location" TO "parking_location";
  ALTER TABLE "orders" RENAME COLUMN "pdf_id" TO "purchase_pdf_id";
  ALTER TABLE "orders" RENAME COLUMN "notes" TO "order_notes";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_browser_view" TO "version_enable_browser_view";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_location" TO "version_parking_location";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_pdf_id" TO "version_purchase_pdf_id";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_notes" TO "version_order_notes";
  ALTER TABLE "settings" RENAME COLUMN "proxy_server" TO "proxy_login";
  ALTER TABLE "orders" DROP CONSTRAINT "orders_pdf_id_files_id_fk";
  
  ALTER TABLE "_orders_v" DROP CONSTRAINT "_orders_v_version_pdf_id_files_id_fk";
  
  DROP INDEX "orders_pdf_idx";
  DROP INDEX "_orders_v_version_version_pdf_idx";
  ALTER TABLE "settings" ADD COLUMN "proxy_password" varchar;
  ALTER TABLE "settings" ADD COLUMN "proxy_host" varchar;
  ALTER TABLE "settings" ADD COLUMN "proxy_port" varchar;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_purchase_pdf_id_files_id_fk" FOREIGN KEY ("purchase_pdf_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_purchase_pdf_id_files_id_fk" FOREIGN KEY ("version_purchase_pdf_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "orders_purchase_pdf_idx" ON "orders" USING btree ("purchase_pdf_id");
  CREATE INDEX "_orders_v_version_version_purchase_pdf_idx" ON "_orders_v" USING btree ("version_purchase_pdf_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" RENAME COLUMN "enable_browser_view" TO "browser_view";
  ALTER TABLE "orders" RENAME COLUMN "parking_location" TO "location";
  ALTER TABLE "orders" RENAME COLUMN "purchase_pdf_id" TO "pdf_id";
  ALTER TABLE "orders" RENAME COLUMN "order_notes" TO "notes";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_enable_browser_view" TO "version_browser_view";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_parking_location" TO "version_location";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_purchase_pdf_id" TO "version_pdf_id";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_order_notes" TO "version_notes";
  ALTER TABLE "settings" RENAME COLUMN "proxy_login" TO "proxy_server";
  ALTER TABLE "orders" DROP CONSTRAINT "orders_purchase_pdf_id_files_id_fk";
  
  ALTER TABLE "_orders_v" DROP CONSTRAINT "_orders_v_version_purchase_pdf_id_files_id_fk";
  
  DROP INDEX "orders_purchase_pdf_idx";
  DROP INDEX "_orders_v_version_version_purchase_pdf_idx";
  ALTER TABLE "orders" ADD CONSTRAINT "orders_pdf_id_files_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_pdf_id_files_id_fk" FOREIGN KEY ("version_pdf_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "orders_pdf_idx" ON "orders" USING btree ("pdf_id");
  CREATE INDEX "_orders_v_version_version_pdf_idx" ON "_orders_v" USING btree ("version_pdf_id");
  ALTER TABLE "settings" DROP COLUMN "proxy_password";
  ALTER TABLE "settings" DROP COLUMN "proxy_host";
  ALTER TABLE "settings" DROP COLUMN "proxy_port";`)
}
