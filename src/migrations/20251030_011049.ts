import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" RENAME COLUMN "price" TO "projected_cost";
  ALTER TABLE "orders" RENAME COLUMN "value" TO "order_value";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_price" TO "version_projected_cost";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_value" TO "version_order_value";
  ALTER TABLE "orders" ADD COLUMN "actual_cost" numeric;
  ALTER TABLE "_orders_v" ADD COLUMN "version_actual_cost" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" RENAME COLUMN "order_value" TO "value";
  ALTER TABLE "orders" RENAME COLUMN "projected_cost" TO "price";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_order_value" TO "version_value";
  ALTER TABLE "_orders_v" RENAME COLUMN "version_projected_cost" TO "version_price";
  ALTER TABLE "orders" DROP COLUMN "actual_cost";
  ALTER TABLE "_orders_v" DROP COLUMN "version_actual_cost";`)
}
