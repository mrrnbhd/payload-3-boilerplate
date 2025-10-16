import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_if_filter_collections" AS ENUM('Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TYPE "public"."enum_jobs_if_condition" AS ENUM('Is Equal to', 'Is Not Equal to', 'Is Less Than', 'Is Less Than or Equal to', 'Is Greater Than', 'Is Greater Than or Equal to', 'Is Like', 'Is Not Like', 'Is In', 'Is Not In', 'Exists');
  CREATE TYPE "public"."enum_jobs_if_comparison_type" AS ENUM('Static Value', 'Dynamic Value');
  CREATE TYPE "public"."enum_jobs_if_compared_collections" AS ENUM('Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TYPE "public"."enum_jobs_then_actions_action_type" AS ENUM('Payload Action', 'TradeDesk Action');
  CREATE TYPE "public"."enum_jobs_then_actions_event_type" AS ENUM('Create', 'Update', 'Delete');
  CREATE TYPE "public"."enum_jobs_then_actions_target_collections" AS ENUM('Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TYPE "public"."enum_jobs_when_event_type" AS ENUM('Create', 'Update', 'Delete');
  CREATE TYPE "public"."enum_jobs_when_source_collections" AS ENUM('Tasks', 'Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TABLE "jobs_then_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"action_type" "enum_jobs_then_actions_action_type",
  	"event_type" "enum_jobs_then_actions_event_type",
  	"target_collections" "enum_jobs_then_actions_target_collections",
  	"target_fields" varchar
  );
  
  ALTER TABLE "jobs_then_operations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "jobs_then_operations" CASCADE;
  ALTER TABLE "jobs" DROP CONSTRAINT "jobs_job_assignee_id_users_id_fk";
  
  ALTER TABLE "jobs" DROP CONSTRAINT "jobs_job_proxies_id_pools_id_fk";
  
  ALTER TABLE "jobs" ALTER COLUMN "when_trigger" SET DATA TYPE text;
  DROP TYPE "public"."enum_jobs_when_trigger";
  CREATE TYPE "public"."enum_jobs_when_trigger" AS ENUM('Payload Event', 'TradeDesk Event');
  ALTER TABLE "jobs" ALTER COLUMN "when_trigger" SET DATA TYPE "public"."enum_jobs_when_trigger" USING "when_trigger"::"public"."enum_jobs_when_trigger";
  DROP INDEX "jobs_job_assignee_idx";
  DROP INDEX "jobs_job_proxies_idx";
  ALTER TABLE "jobs_if" ADD COLUMN "filter_collections" "enum_jobs_if_filter_collections";
  ALTER TABLE "jobs_if" ADD COLUMN "filter_fields" varchar;
  ALTER TABLE "jobs_if" ADD COLUMN "condition" "enum_jobs_if_condition";
  ALTER TABLE "jobs_if" ADD COLUMN "comparison_type" "enum_jobs_if_comparison_type";
  ALTER TABLE "jobs_if" ADD COLUMN "compared_value" varchar;
  ALTER TABLE "jobs_if" ADD COLUMN "compared_collections" "enum_jobs_if_compared_collections";
  ALTER TABLE "jobs_if" ADD COLUMN "compared_fields" varchar;
  ALTER TABLE "jobs" ADD COLUMN "when_event_type" "enum_jobs_when_event_type";
  ALTER TABLE "jobs" ADD COLUMN "when_source_collections" "enum_jobs_when_source_collections";
  ALTER TABLE "jobs" ADD COLUMN "when_source_fields" varchar;
  ALTER TABLE "jobs_rels" ADD COLUMN "tasks_id" uuid;
  ALTER TABLE "jobs_then_actions" ADD CONSTRAINT "jobs_then_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs_then"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "jobs_then_actions_order_idx" ON "jobs_then_actions" USING btree ("_order");
  CREATE INDEX "jobs_then_actions_parent_id_idx" ON "jobs_then_actions" USING btree ("_parent_id");
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_tasks_fk" FOREIGN KEY ("tasks_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "jobs_rels_tasks_id_idx" ON "jobs_rels" USING btree ("tasks_id");
  ALTER TABLE "jobs_if" DROP COLUMN "filter";
  ALTER TABLE "jobs_if" DROP COLUMN "target_collections";
  ALTER TABLE "jobs_if" DROP COLUMN "target_fields";
  ALTER TABLE "jobs" DROP COLUMN "job_assignee_id";
  ALTER TABLE "jobs" DROP COLUMN "job_proxies_id";
  ALTER TABLE "jobs" DROP COLUMN "when_target_collections";
  ALTER TABLE "jobs" DROP COLUMN "when_target_fields";
  DROP TYPE "public"."enum_jobs_if_filter";
  DROP TYPE "public"."enum_jobs_if_target_collections";
  DROP TYPE "public"."enum_jobs_then_operations_type";
  DROP TYPE "public"."enum_jobs_when_target_collections";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_jobs_if_filter" AS ENUM('Is Equal to', 'Is Not Equal to', 'Is Less Than', 'Is Less Than or Equal to', 'Is Greater Than', 'Is Greater Than or Equal to', 'Is Like', 'Is Not Like', 'Is In', 'Is Not In', 'Exists');
  CREATE TYPE "public"."enum_jobs_if_target_collections" AS ENUM('Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TYPE "public"."enum_jobs_then_operations_type" AS ENUM('Payload Operation', 'TradeDesk Operation');
  CREATE TYPE "public"."enum_jobs_when_target_collections" AS ENUM('Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TABLE "jobs_then_operations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_jobs_then_operations_type"
  );
  
  ALTER TABLE "jobs_then_actions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "jobs_then_actions" CASCADE;
  ALTER TABLE "jobs_rels" DROP CONSTRAINT "jobs_rels_tasks_fk";
  
  ALTER TABLE "jobs" ALTER COLUMN "when_trigger" SET DATA TYPE text;
  DROP TYPE "public"."enum_jobs_when_trigger";
  CREATE TYPE "public"."enum_jobs_when_trigger" AS ENUM('A Payload Collection is Changed', 'A TradeDesk Webhook is Received');
  ALTER TABLE "jobs" ALTER COLUMN "when_trigger" SET DATA TYPE "public"."enum_jobs_when_trigger" USING "when_trigger"::"public"."enum_jobs_when_trigger";
  DROP INDEX "jobs_rels_tasks_id_idx";
  ALTER TABLE "jobs_if" ADD COLUMN "filter" "enum_jobs_if_filter";
  ALTER TABLE "jobs_if" ADD COLUMN "target_collections" "enum_jobs_if_target_collections";
  ALTER TABLE "jobs_if" ADD COLUMN "target_fields" varchar;
  ALTER TABLE "jobs" ADD COLUMN "job_assignee_id" uuid;
  ALTER TABLE "jobs" ADD COLUMN "job_proxies_id" uuid;
  ALTER TABLE "jobs" ADD COLUMN "when_target_collections" "enum_jobs_when_target_collections";
  ALTER TABLE "jobs" ADD COLUMN "when_target_fields" varchar;
  ALTER TABLE "jobs_then_operations" ADD CONSTRAINT "jobs_then_operations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs_then"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "jobs_then_operations_order_idx" ON "jobs_then_operations" USING btree ("_order");
  CREATE INDEX "jobs_then_operations_parent_id_idx" ON "jobs_then_operations" USING btree ("_parent_id");
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_assignee_id_users_id_fk" FOREIGN KEY ("job_assignee_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_proxies_id_pools_id_fk" FOREIGN KEY ("job_proxies_id") REFERENCES "public"."pools"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "jobs_job_assignee_idx" ON "jobs" USING btree ("job_assignee_id");
  CREATE INDEX "jobs_job_proxies_idx" ON "jobs" USING btree ("job_proxies_id");
  ALTER TABLE "jobs_if" DROP COLUMN "filter_collections";
  ALTER TABLE "jobs_if" DROP COLUMN "filter_fields";
  ALTER TABLE "jobs_if" DROP COLUMN "condition";
  ALTER TABLE "jobs_if" DROP COLUMN "comparison_type";
  ALTER TABLE "jobs_if" DROP COLUMN "compared_value";
  ALTER TABLE "jobs_if" DROP COLUMN "compared_collections";
  ALTER TABLE "jobs_if" DROP COLUMN "compared_fields";
  ALTER TABLE "jobs" DROP COLUMN "when_event_type";
  ALTER TABLE "jobs" DROP COLUMN "when_source_collections";
  ALTER TABLE "jobs" DROP COLUMN "when_source_fields";
  ALTER TABLE "jobs_rels" DROP COLUMN "tasks_id";
  DROP TYPE "public"."enum_jobs_if_filter_collections";
  DROP TYPE "public"."enum_jobs_if_condition";
  DROP TYPE "public"."enum_jobs_if_comparison_type";
  DROP TYPE "public"."enum_jobs_if_compared_collections";
  DROP TYPE "public"."enum_jobs_then_actions_action_type";
  DROP TYPE "public"."enum_jobs_then_actions_event_type";
  DROP TYPE "public"."enum_jobs_then_actions_target_collections";
  DROP TYPE "public"."enum_jobs_when_event_type";
  DROP TYPE "public"."enum_jobs_when_source_collections";`)
}
