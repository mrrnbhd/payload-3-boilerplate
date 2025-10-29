import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ALTER COLUMN "order_number" SET DATA TYPE varchar;
  ALTER TABLE "_orders_v" ALTER COLUMN "version_order_number" SET DATA TYPE varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ALTER COLUMN "order_number" SET DATA TYPE numeric;
  ALTER TABLE "_orders_v" ALTER COLUMN "version_order_number" SET DATA TYPE numeric;`)
}
