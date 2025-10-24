import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_user_role" AS ENUM('User', 'Admin');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_admin_invitations_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_orders_parking_tickets_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum_orders_parking_tickets_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum_orders_parking_tickets_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum_orders_order_history_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum_orders_order_history_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum_orders_order_history_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum_orders_order_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled', 'Archived');
  CREATE TYPE "public"."enum_orders_marketplace" AS ENUM('Stubhub', 'SeatGeek', 'GoTickets');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__orders_v_version_parking_tickets_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum__orders_v_version_parking_tickets_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum__orders_v_version_parking_tickets_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum__orders_v_version_order_history_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum__orders_v_version_order_history_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum__orders_v_version_order_history_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum__orders_v_version_order_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled', 'Archived');
  CREATE TYPE "public"."enum__orders_v_version_marketplace" AS ENUM('Stubhub', 'SeatGeek', 'GoTickets');
  CREATE TYPE "public"."enum__orders_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pools_connection_config_auth_type" AS ENUM('none', 'usernamePassword', 'ipWhitelist');
  CREATE TYPE "public"."enum_pools_pool_status" AS ENUM('active', 'maintenance', 'disabled');
  CREATE TYPE "public"."enum_audit_log_type" AS ENUM('info', 'debug', 'warning', 'error', 'audit', 'security', 'unknown');
  CREATE TYPE "public"."enum_payload_query_presets_access_read_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_update_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_delete_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('payload-uploads');
  CREATE TABLE "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_role" "enum_users_user_role",
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"email_verified" boolean DEFAULT false NOT NULL,
  	"image" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"username" varchar,
  	"display_username" varchar,
  	"normalized_email" varchar,
  	"phone_number" varchar,
  	"phone_number_verified" boolean DEFAULT false,
  	"role" "enum_users_role" DEFAULT 'user',
  	"banned" boolean DEFAULT false,
  	"ban_reason" varchar,
  	"ban_expires" timestamp(3) with time zone,
  	"verified" boolean
  );
  
  CREATE TABLE "sessions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"token" varchar NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"ip_address" varchar,
  	"user_agent" varchar,
  	"user_id" uuid NOT NULL,
  	"impersonated_by_id" uuid
  );
  
  CREATE TABLE "accounts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"account_id" varchar NOT NULL,
  	"provider_id" varchar NOT NULL,
  	"user_id" uuid NOT NULL,
  	"access_token" varchar,
  	"refresh_token" varchar,
  	"id_token" varchar,
  	"access_token_expires_at" timestamp(3) with time zone,
  	"refresh_token_expires_at" timestamp(3) with time zone,
  	"scope" varchar,
  	"password" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "verifications" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"identifier" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "passkeys" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"public_key" varchar NOT NULL,
  	"user_id" uuid NOT NULL,
  	"credential_i_d" varchar NOT NULL,
  	"counter" numeric NOT NULL,
  	"device_type" varchar NOT NULL,
  	"backed_up" boolean DEFAULT false NOT NULL,
  	"transports" varchar NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"aaguid" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admin_invitations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"role" "enum_admin_invitations_role" DEFAULT 'admin' NOT NULL,
  	"token" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_parking_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_orders_parking_tickets_source",
  	"link" varchar,
  	"type" "enum_orders_parking_tickets_type",
  	"status" "enum_orders_parking_tickets_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric
  );
  
  CREATE TABLE "orders_order_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_orders_order_history_source",
  	"link" varchar,
  	"type" "enum_orders_order_history_type",
  	"status" "enum_orders_order_history_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric
  );
  
  CREATE TABLE "orders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"order_status" "enum_orders_order_status",
  	"order_value" numeric,
  	"order_number" numeric,
  	"order_link" varchar,
  	"marketplace" "enum_orders_marketplace",
  	"event_or_performer_name" varchar,
  	"venue_name" varchar,
  	"order_notes" varchar,
  	"handbook" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_orders_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_orders_v_version_parking_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"source" "enum__orders_v_version_parking_tickets_source",
  	"link" varchar,
  	"type" "enum__orders_v_version_parking_tickets_type",
  	"status" "enum__orders_v_version_parking_tickets_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_orders_v_version_order_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"source" "enum__orders_v_version_order_history_source",
  	"link" varchar,
  	"type" "enum__orders_v_version_order_history_type",
  	"status" "enum__orders_v_version_order_history_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_orders_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_order_status" "enum__orders_v_version_order_status",
  	"version_order_value" numeric,
  	"version_order_number" numeric,
  	"version_order_link" varchar,
  	"version_marketplace" "enum__orders_v_version_marketplace",
  	"version_event_or_performer_name" varchar,
  	"version_venue_name" varchar,
  	"version_order_notes" varchar,
  	"version_handbook" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__orders_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "profiles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pools_connection_config" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" varchar,
  	"last_health_check" timestamp(3) with time zone,
  	"host" varchar NOT NULL,
  	"port" numeric,
  	"auth_type" "enum_pools_connection_config_auth_type" DEFAULT 'usernamePassword',
  	"credentials_username" varchar,
  	"credentials_password" varchar
  );
  
  CREATE TABLE "pools" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"pool_name" varchar NOT NULL,
  	"pool_status" "enum_pools_pool_status" DEFAULT 'active' NOT NULL,
  	"user_handbook" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_uploads" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"prefix" varchar DEFAULT 'payload-uploads',
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "audit_log" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"operation" varchar NOT NULL,
  	"collection" varchar NOT NULL,
  	"document_id" varchar,
  	"user_id" uuid NOT NULL,
  	"user_agent" varchar,
  	"hook" varchar,
  	"type" "enum_audit_log_type" DEFAULT 'info' NOT NULL,
  	"created_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"sessions_id" uuid,
  	"accounts_id" uuid,
  	"verifications_id" uuid,
  	"passkeys_id" uuid,
  	"admin_invitations_id" uuid,
  	"orders_id" uuid,
  	"profiles_id" uuid,
  	"pools_id" uuid,
  	"payload_uploads_id" uuid,
  	"audit_log_id" uuid,
  	"payload_folders_id" uuid
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_query_presets" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"is_shared" boolean DEFAULT false,
  	"access_read_constraint" "enum_payload_query_presets_access_read_constraint" DEFAULT 'onlyMe',
  	"access_update_constraint" "enum_payload_query_presets_access_update_constraint" DEFAULT 'onlyMe',
  	"access_delete_constraint" "enum_payload_query_presets_access_delete_constraint" DEFAULT 'onlyMe',
  	"where" jsonb,
  	"columns" jsonb,
  	"related_collection" "enum_payload_query_presets_related_collection" NOT NULL,
  	"is_temp" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_query_presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_impersonated_by_id_users_id_fk" FOREIGN KEY ("impersonated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "passkeys" ADD CONSTRAINT "passkeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_parking_tickets" ADD CONSTRAINT "orders_parking_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_order_history" ADD CONSTRAINT "orders_order_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_parking_tickets" ADD CONSTRAINT "_orders_v_version_parking_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_order_history" ADD CONSTRAINT "_orders_v_version_order_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_parent_id_orders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pools_connection_config" ADD CONSTRAINT "pools_connection_config_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_uploads" ADD CONSTRAINT "payload_uploads_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accounts_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_verifications_fk" FOREIGN KEY ("verifications_id") REFERENCES "public"."verifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_passkeys_fk" FOREIGN KEY ("passkeys_id") REFERENCES "public"."passkeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_invitations_fk" FOREIGN KEY ("admin_invitations_id") REFERENCES "public"."admin_invitations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_profiles_fk" FOREIGN KEY ("profiles_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pools_fk" FOREIGN KEY ("pools_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_uploads_fk" FOREIGN KEY ("payload_uploads_id") REFERENCES "public"."payload_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_query_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");
  CREATE UNIQUE INDEX "users_normalized_email_idx" ON "users" USING btree ("normalized_email");
  CREATE UNIQUE INDEX "users_phone_number_idx" ON "users" USING btree ("phone_number");
  CREATE UNIQUE INDEX "sessions_token_idx" ON "sessions" USING btree ("token");
  CREATE INDEX "sessions_created_at_idx" ON "sessions" USING btree ("created_at");
  CREATE INDEX "sessions_updated_at_idx" ON "sessions" USING btree ("updated_at");
  CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");
  CREATE INDEX "sessions_impersonated_by_idx" ON "sessions" USING btree ("impersonated_by_id");
  CREATE INDEX "accounts_account_id_idx" ON "accounts" USING btree ("account_id");
  CREATE INDEX "accounts_user_idx" ON "accounts" USING btree ("user_id");
  CREATE INDEX "accounts_access_token_expires_at_idx" ON "accounts" USING btree ("access_token_expires_at");
  CREATE INDEX "accounts_refresh_token_expires_at_idx" ON "accounts" USING btree ("refresh_token_expires_at");
  CREATE INDEX "accounts_created_at_idx" ON "accounts" USING btree ("created_at");
  CREATE INDEX "accounts_updated_at_idx" ON "accounts" USING btree ("updated_at");
  CREATE INDEX "verifications_identifier_idx" ON "verifications" USING btree ("identifier");
  CREATE INDEX "verifications_expires_at_idx" ON "verifications" USING btree ("expires_at");
  CREATE INDEX "verifications_created_at_idx" ON "verifications" USING btree ("created_at");
  CREATE INDEX "verifications_updated_at_idx" ON "verifications" USING btree ("updated_at");
  CREATE INDEX "passkeys_public_key_idx" ON "passkeys" USING btree ("public_key");
  CREATE INDEX "passkeys_user_idx" ON "passkeys" USING btree ("user_id");
  CREATE INDEX "passkeys_updated_at_idx" ON "passkeys" USING btree ("updated_at");
  CREATE INDEX "admin_invitations_token_idx" ON "admin_invitations" USING btree ("token");
  CREATE INDEX "admin_invitations_updated_at_idx" ON "admin_invitations" USING btree ("updated_at");
  CREATE INDEX "admin_invitations_created_at_idx" ON "admin_invitations" USING btree ("created_at");
  CREATE INDEX "orders_parking_tickets_order_idx" ON "orders_parking_tickets" USING btree ("_order");
  CREATE INDEX "orders_parking_tickets_parent_id_idx" ON "orders_parking_tickets" USING btree ("_parent_id");
  CREATE INDEX "orders_order_history_order_idx" ON "orders_order_history" USING btree ("_order");
  CREATE INDEX "orders_order_history_parent_id_idx" ON "orders_order_history" USING btree ("_parent_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "orders__status_idx" ON "orders" USING btree ("_status");
  CREATE INDEX "_orders_v_version_parking_tickets_order_idx" ON "_orders_v_version_parking_tickets" USING btree ("_order");
  CREATE INDEX "_orders_v_version_parking_tickets_parent_id_idx" ON "_orders_v_version_parking_tickets" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_order_history_order_idx" ON "_orders_v_version_order_history" USING btree ("_order");
  CREATE INDEX "_orders_v_version_order_history_parent_id_idx" ON "_orders_v_version_order_history" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_parent_idx" ON "_orders_v" USING btree ("parent_id");
  CREATE INDEX "_orders_v_version_version_updated_at_idx" ON "_orders_v" USING btree ("version_updated_at");
  CREATE INDEX "_orders_v_version_version_created_at_idx" ON "_orders_v" USING btree ("version_created_at");
  CREATE INDEX "_orders_v_version_version__status_idx" ON "_orders_v" USING btree ("version__status");
  CREATE INDEX "_orders_v_created_at_idx" ON "_orders_v" USING btree ("created_at");
  CREATE INDEX "_orders_v_updated_at_idx" ON "_orders_v" USING btree ("updated_at");
  CREATE INDEX "_orders_v_latest_idx" ON "_orders_v" USING btree ("latest");
  CREATE INDEX "_orders_v_autosave_idx" ON "_orders_v" USING btree ("autosave");
  CREATE INDEX "profiles_updated_at_idx" ON "profiles" USING btree ("updated_at");
  CREATE INDEX "profiles_created_at_idx" ON "profiles" USING btree ("created_at");
  CREATE INDEX "pools_connection_config_order_idx" ON "pools_connection_config" USING btree ("_order");
  CREATE INDEX "pools_connection_config_parent_id_idx" ON "pools_connection_config" USING btree ("_parent_id");
  CREATE INDEX "pools_updated_at_idx" ON "pools" USING btree ("updated_at");
  CREATE INDEX "pools_created_at_idx" ON "pools" USING btree ("created_at");
  CREATE INDEX "payload_uploads_folder_idx" ON "payload_uploads" USING btree ("folder_id");
  CREATE INDEX "payload_uploads_updated_at_idx" ON "payload_uploads" USING btree ("updated_at");
  CREATE INDEX "payload_uploads_created_at_idx" ON "payload_uploads" USING btree ("created_at");
  CREATE INDEX "payload_uploads_deleted_at_idx" ON "payload_uploads" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "payload_uploads_filename_idx" ON "payload_uploads" USING btree ("filename");
  CREATE INDEX "payload_uploads_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "payload_uploads" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "payload_uploads_sizes_square_sizes_square_filename_idx" ON "payload_uploads" USING btree ("sizes_square_filename");
  CREATE INDEX "payload_uploads_sizes_small_sizes_small_filename_idx" ON "payload_uploads" USING btree ("sizes_small_filename");
  CREATE INDEX "payload_uploads_sizes_medium_sizes_medium_filename_idx" ON "payload_uploads" USING btree ("sizes_medium_filename");
  CREATE INDEX "payload_uploads_sizes_large_sizes_large_filename_idx" ON "payload_uploads" USING btree ("sizes_large_filename");
  CREATE INDEX "payload_uploads_sizes_xlarge_sizes_xlarge_filename_idx" ON "payload_uploads" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "payload_uploads_sizes_og_sizes_og_filename_idx" ON "payload_uploads" USING btree ("sizes_og_filename");
  CREATE INDEX "audit_log_user_idx" ON "audit_log" USING btree ("user_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("sessions_id");
  CREATE INDEX "payload_locked_documents_rels_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("accounts_id");
  CREATE INDEX "payload_locked_documents_rels_verifications_id_idx" ON "payload_locked_documents_rels" USING btree ("verifications_id");
  CREATE INDEX "payload_locked_documents_rels_passkeys_id_idx" ON "payload_locked_documents_rels" USING btree ("passkeys_id");
  CREATE INDEX "payload_locked_documents_rels_admin_invitations_id_idx" ON "payload_locked_documents_rels" USING btree ("admin_invitations_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("profiles_id");
  CREATE INDEX "payload_locked_documents_rels_pools_id_idx" ON "payload_locked_documents_rels" USING btree ("pools_id");
  CREATE INDEX "payload_locked_documents_rels_payload_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_uploads_id");
  CREATE INDEX "payload_locked_documents_rels_audit_log_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_log_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "payload_query_presets_updated_at_idx" ON "payload_query_presets" USING btree ("updated_at");
  CREATE INDEX "payload_query_presets_created_at_idx" ON "payload_query_presets" USING btree ("created_at");
  CREATE INDEX "payload_query_presets_rels_order_idx" ON "payload_query_presets_rels" USING btree ("order");
  CREATE INDEX "payload_query_presets_rels_parent_idx" ON "payload_query_presets_rels" USING btree ("parent_id");
  CREATE INDEX "payload_query_presets_rels_path_idx" ON "payload_query_presets_rels" USING btree ("path");
  CREATE INDEX "payload_query_presets_rels_users_id_idx" ON "payload_query_presets_rels" USING btree ("users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "accounts" CASCADE;
  DROP TABLE "verifications" CASCADE;
  DROP TABLE "passkeys" CASCADE;
  DROP TABLE "admin_invitations" CASCADE;
  DROP TABLE "orders_parking_tickets" CASCADE;
  DROP TABLE "orders_order_history" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "_orders_v_version_parking_tickets" CASCADE;
  DROP TABLE "_orders_v_version_order_history" CASCADE;
  DROP TABLE "_orders_v" CASCADE;
  DROP TABLE "profiles" CASCADE;
  DROP TABLE "pools_connection_config" CASCADE;
  DROP TABLE "pools" CASCADE;
  DROP TABLE "payload_uploads" CASCADE;
  DROP TABLE "audit_log" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_query_presets" CASCADE;
  DROP TABLE "payload_query_presets_rels" CASCADE;
  DROP TYPE "public"."enum_users_user_role";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_admin_invitations_role";
  DROP TYPE "public"."enum_orders_parking_tickets_source";
  DROP TYPE "public"."enum_orders_parking_tickets_type";
  DROP TYPE "public"."enum_orders_parking_tickets_status";
  DROP TYPE "public"."enum_orders_order_history_source";
  DROP TYPE "public"."enum_orders_order_history_type";
  DROP TYPE "public"."enum_orders_order_history_status";
  DROP TYPE "public"."enum_orders_order_status";
  DROP TYPE "public"."enum_orders_marketplace";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum__orders_v_version_parking_tickets_source";
  DROP TYPE "public"."enum__orders_v_version_parking_tickets_type";
  DROP TYPE "public"."enum__orders_v_version_parking_tickets_status";
  DROP TYPE "public"."enum__orders_v_version_order_history_source";
  DROP TYPE "public"."enum__orders_v_version_order_history_type";
  DROP TYPE "public"."enum__orders_v_version_order_history_status";
  DROP TYPE "public"."enum__orders_v_version_order_status";
  DROP TYPE "public"."enum__orders_v_version_marketplace";
  DROP TYPE "public"."enum__orders_v_version_status";
  DROP TYPE "public"."enum_pools_connection_config_auth_type";
  DROP TYPE "public"."enum_pools_pool_status";
  DROP TYPE "public"."enum_audit_log_type";
  DROP TYPE "public"."enum_payload_query_presets_access_read_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_update_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_delete_constraint";
  DROP TYPE "public"."enum_payload_query_presets_related_collection";`)
}
