import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" DROP COLUMN "event";
  ALTER TABLE "orders" DROP COLUMN "venue";
  ALTER TABLE "_orders_v" DROP COLUMN "version_event";
  ALTER TABLE "_orders_v" DROP COLUMN "version_venue";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "orders" ADD COLUMN "event" varchar;
  ALTER TABLE "orders" ADD COLUMN "venue" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_event" varchar;
  ALTER TABLE "_orders_v" ADD COLUMN "version_venue" varchar;`)
}
