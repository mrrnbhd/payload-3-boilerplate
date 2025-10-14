import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_user_role" AS ENUM('Operator', 'Admin');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_admin_invitations_role" AS ENUM('admin', 'user');
  CREATE TYPE "public"."enum_tasks_type" AS ENUM('Fulfill Orders', 'Custom Task');
  CREATE TYPE "public"."enum_tasks_task_status" AS ENUM('Pending', 'In Progress', 'Complete', 'Blocked', 'Backlogged');
  CREATE TYPE "public"."enum_jobs_if_filter" AS ENUM('Is Equal to', 'Is Not Equal to', 'Is Less Than', 'Is Less Than or Equal to', 'Is Greater Than', 'Is Greater Than or Equal to', 'Is Like', 'Is Not Like', 'Is In', 'Is Not In', 'Exists');
  CREATE TYPE "public"."enum_jobs_then_task_status" AS ENUM('Pending', 'In Progress', 'Complete', 'Blocked', 'Backlogged');
  CREATE TYPE "public"."enum_jobs_job_status" AS ENUM('Pending', 'In Progress', 'Complete', 'Blocked', 'Backlogged');
  CREATE TYPE "public"."enum_jobs_when_trigger" AS ENUM('A Payload Collection is Changed', 'A TradeDesk Webhook is Received');
  CREATE TYPE "public"."enum_jobs_when_target_collections" AS ENUM('Orders', 'Pools', 'Users', 'Tags', 'Jobs');
  CREATE TYPE "public"."enum_orders_event_tickets_parking_tickets_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum_orders_event_tickets_parking_tickets_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum_orders_event_tickets_parking_tickets_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum_orders_event_tickets_marketplace" AS ENUM('Stubhub', 'SeatGeek', 'GoTickets');
  CREATE TYPE "public"."enum_orders_order_history_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum_orders_order_history_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum_orders_order_history_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum_orders_order_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled', 'Archived');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum__orders_v_version_event_tickets_marketplace" AS ENUM('Stubhub', 'SeatGeek', 'GoTickets');
  CREATE TYPE "public"."enum__orders_v_version_order_history_source" AS ENUM('SpotHero', 'ParkWhiz', 'ParkMobile', 'AceParking');
  CREATE TYPE "public"."enum__orders_v_version_order_history_type" AS ENUM('Eticket');
  CREATE TYPE "public"."enum__orders_v_version_order_history_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled');
  CREATE TYPE "public"."enum__orders_v_version_order_status" AS ENUM('Pending', 'Purchased', 'Fulfilled', 'Blocked', 'Cancelled', 'Archived');
  CREATE TYPE "public"."enum__orders_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pools_connection_config_auth_type" AS ENUM('none', 'usernamePassword', 'ipWhitelist');
  CREATE TYPE "public"."enum_pools_pool_status" AS ENUM('active', 'maintenance', 'disabled');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_blocks_email_width" AS ENUM('full', '3/4', '2/3', '1/2', '1/3', '1/4');
  CREATE TYPE "public"."enum_forms_blocks_text_width" AS ENUM('full', '3/4', '2/3', '1/2', '1/3', '1/4');
  CREATE TYPE "public"."enum_forms_blocks_user_info_options" AS ENUM('name', 'email', 'phoneNumber', 'id');
  CREATE TYPE "public"."enum_forms_blocks_user_info_width" AS ENUM('full', '3/4', '2/3', '1/2', '1/3', '1/4');
  CREATE TYPE "public"."enum_forms_blocks_phone_width" AS ENUM('full', '3/4', '2/3', '1/2', '1/3', '1/4');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_audit_log_type" AS ENUM('info', 'debug', 'warning', 'error', 'audit', 'security', 'unknown');
  CREATE TYPE "public"."enum_payload_query_presets_access_read_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_update_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_access_delete_constraint" AS ENUM('everyone', 'onlyMe', 'specificUsers');
  CREATE TYPE "public"."enum_payload_query_presets_related_collection" AS ENUM('pages', 'payload-uploads', 'private-uploads');
  CREATE TYPE "public"."enum_global_footer_nav_items_link_type" AS ENUM('custom', 'reference');
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
  
  CREATE TABLE "tasks" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"type" "enum_tasks_type",
  	"tags_id" uuid,
  	"task_status" "enum_tasks_task_status",
  	"task_notes" jsonb,
  	"user_handbook" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tasks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"pools_id" uuid
  );
  
  CREATE TABLE "jobs_if" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"filter" "enum_jobs_if_filter"
  );
  
  CREATE TABLE "jobs_then" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task_status" "enum_jobs_then_task_status",
  	"task_notes" jsonb
  );
  
  CREATE TABLE "jobs" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"job_name" varchar,
  	"job_status" "enum_jobs_job_status",
  	"job_tags_id" uuid,
  	"when_trigger" "enum_jobs_when_trigger",
  	"when_target_collections" "enum_jobs_when_target_collections",
  	"when_target_fields" varchar,
  	"user_handbook" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid,
  	"pools_id" uuid,
  	"orders_id" uuid,
  	"tags_id" uuid,
  	"jobs_id" uuid
  );
  
  CREATE TABLE "orders_event_tickets_parking_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_orders_event_tickets_parking_tickets_source",
  	"link" varchar,
  	"type" "enum_orders_event_tickets_parking_tickets_type",
  	"status" "enum_orders_event_tickets_parking_tickets_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric
  );
  
  CREATE TABLE "orders_event_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"marketplace" "enum_orders_event_tickets_marketplace",
  	"event_or_performer_name" varchar,
  	"venue_name" varchar
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
  	"order_tags_id" uuid,
  	"order_notes" jsonb,
  	"user_handbook" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_orders_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_orders_v_version_event_tickets_parking_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"source" "enum__orders_v_version_event_tickets_parking_tickets_source",
  	"link" varchar,
  	"type" "enum__orders_v_version_event_tickets_parking_tickets_type",
  	"status" "enum__orders_v_version_event_tickets_parking_tickets_status",
  	"parking_spot_location" varchar,
  	"projected_purchase_price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_orders_v_version_event_tickets" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"marketplace" "enum__orders_v_version_event_tickets_marketplace",
  	"event_or_performer_name" varchar,
  	"venue_name" varchar,
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
  	"version_order_tags_id" uuid,
  	"version_order_notes" jsonb,
  	"version_user_handbook" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__orders_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
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
  	"user_handbook" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"tags_id" uuid,
  	"hero_image_id" uuid,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" uuid,
  	"meta_description" varchar,
  	"folder_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_tags_id" uuid,
  	"version_hero_image_id" uuid,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" uuid,
  	"version_meta_description" varchar,
  	"version_folder_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "tags" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_uploads" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
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
  
  CREATE TABLE "private_uploads" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'private-uploads',
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
  	"focal_y" numeric
  );
  
  CREATE TABLE "private_uploads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" uuid
  );
  
  CREATE TABLE "handbook" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"tags_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"placeholder" varchar,
  	"default_value" varchar,
  	"width" "enum_forms_blocks_email_width" DEFAULT 'full',
  	"required" boolean,
  	"hidden" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"placeholder" varchar,
  	"default_value" varchar,
  	"width" "enum_forms_blocks_text_width" DEFAULT 'full',
  	"required" boolean,
  	"hidden" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"hidden" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_user_info_options" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_forms_blocks_user_info_options",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE "forms_blocks_user_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_forms_blocks_user_info_width" DEFAULT 'full',
  	"editable" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_phone" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"placeholder" varchar,
  	"default_value" varchar,
  	"width" "enum_forms_blocks_phone_width" DEFAULT 'full',
  	"required" boolean,
  	"hidden" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"form_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"tasks_id" uuid,
  	"jobs_id" uuid,
  	"orders_id" uuid,
  	"pools_id" uuid,
  	"pages_id" uuid,
  	"tags_id" uuid,
  	"payload_uploads_id" uuid,
  	"private_uploads_id" uuid,
  	"handbook_id" uuid,
  	"forms_id" uuid,
  	"form_submissions_id" uuid,
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
  
  CREATE TABLE "global_footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_global_footer_nav_items_link_type" DEFAULT 'custom',
  	"link_new_tab" boolean,
  	"link_url" varchar DEFAULT 'https://ticketer.com',
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "global_footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"footer_text" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "global_footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" uuid
  );
  
  CREATE TABLE "global_terms" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "global_privacy" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_impersonated_by_id_users_id_fk" FOREIGN KEY ("impersonated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "passkeys" ADD CONSTRAINT "passkeys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tags_id_tags_id_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tasks_rels" ADD CONSTRAINT "tasks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tasks_rels" ADD CONSTRAINT "tasks_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tasks_rels" ADD CONSTRAINT "tasks_rels_pools_fk" FOREIGN KEY ("pools_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_if" ADD CONSTRAINT "jobs_if_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_then" ADD CONSTRAINT "jobs_then_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_tags_id_tags_id_fk" FOREIGN KEY ("job_tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_pools_fk" FOREIGN KEY ("pools_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_event_tickets_parking_tickets" ADD CONSTRAINT "orders_event_tickets_parking_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders_event_tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_event_tickets" ADD CONSTRAINT "orders_event_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_order_history" ADD CONSTRAINT "orders_order_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_order_tags_id_tags_id_fk" FOREIGN KEY ("order_tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v_version_event_tickets_parking_tickets" ADD CONSTRAINT "_orders_v_version_event_tickets_parking_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v_version_event_tickets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_event_tickets" ADD CONSTRAINT "_orders_v_version_event_tickets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v_version_order_history" ADD CONSTRAINT "_orders_v_version_order_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_orders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_parent_id_orders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_orders_v" ADD CONSTRAINT "_orders_v_version_order_tags_id_tags_id_fk" FOREIGN KEY ("version_order_tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pools_connection_config" ADD CONSTRAINT "pools_connection_config_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_tags_id_users_id_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_payload_uploads_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."payload_uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_payload_uploads_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."payload_uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_tags_id_users_id_fk" FOREIGN KEY ("version_tags_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_payload_uploads_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."payload_uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_payload_uploads_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."payload_uploads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_uploads" ADD CONSTRAINT "payload_uploads_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "private_uploads" ADD CONSTRAINT "private_uploads_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "private_uploads_rels" ADD CONSTRAINT "private_uploads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."private_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "private_uploads_rels" ADD CONSTRAINT "private_uploads_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "handbook" ADD CONSTRAINT "handbook_tags_id_tags_id_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_user_info_options" ADD CONSTRAINT "forms_blocks_user_info_options_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms_blocks_user_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_user_info" ADD CONSTRAINT "forms_blocks_user_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_phone" ADD CONSTRAINT "forms_blocks_phone_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accounts_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_verifications_fk" FOREIGN KEY ("verifications_id") REFERENCES "public"."verifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_passkeys_fk" FOREIGN KEY ("passkeys_id") REFERENCES "public"."passkeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admin_invitations_fk" FOREIGN KEY ("admin_invitations_id") REFERENCES "public"."admin_invitations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tasks_fk" FOREIGN KEY ("tasks_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pools_fk" FOREIGN KEY ("pools_id") REFERENCES "public"."pools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_uploads_fk" FOREIGN KEY ("payload_uploads_id") REFERENCES "public"."payload_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_private_uploads_fk" FOREIGN KEY ("private_uploads_id") REFERENCES "public"."private_uploads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_handbook_fk" FOREIGN KEY ("handbook_id") REFERENCES "public"."handbook"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_query_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_query_presets_rels" ADD CONSTRAINT "payload_query_presets_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_footer_nav_items" ADD CONSTRAINT "global_footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_footer_rels" ADD CONSTRAINT "global_footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."global_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_footer_rels" ADD CONSTRAINT "global_footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "tasks_tags_idx" ON "tasks" USING btree ("tags_id");
  CREATE INDEX "tasks_updated_at_idx" ON "tasks" USING btree ("updated_at");
  CREATE INDEX "tasks_created_at_idx" ON "tasks" USING btree ("created_at");
  CREATE INDEX "tasks_rels_order_idx" ON "tasks_rels" USING btree ("order");
  CREATE INDEX "tasks_rels_parent_idx" ON "tasks_rels" USING btree ("parent_id");
  CREATE INDEX "tasks_rels_path_idx" ON "tasks_rels" USING btree ("path");
  CREATE INDEX "tasks_rels_users_id_idx" ON "tasks_rels" USING btree ("users_id");
  CREATE INDEX "tasks_rels_pools_id_idx" ON "tasks_rels" USING btree ("pools_id");
  CREATE INDEX "jobs_if_order_idx" ON "jobs_if" USING btree ("_order");
  CREATE INDEX "jobs_if_parent_id_idx" ON "jobs_if" USING btree ("_parent_id");
  CREATE INDEX "jobs_then_order_idx" ON "jobs_then" USING btree ("_order");
  CREATE INDEX "jobs_then_parent_id_idx" ON "jobs_then" USING btree ("_parent_id");
  CREATE INDEX "jobs_job_tags_idx" ON "jobs" USING btree ("job_tags_id");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs_rels_order_idx" ON "jobs_rels" USING btree ("order");
  CREATE INDEX "jobs_rels_parent_idx" ON "jobs_rels" USING btree ("parent_id");
  CREATE INDEX "jobs_rels_path_idx" ON "jobs_rels" USING btree ("path");
  CREATE INDEX "jobs_rels_users_id_idx" ON "jobs_rels" USING btree ("users_id");
  CREATE INDEX "jobs_rels_pools_id_idx" ON "jobs_rels" USING btree ("pools_id");
  CREATE INDEX "jobs_rels_orders_id_idx" ON "jobs_rels" USING btree ("orders_id");
  CREATE INDEX "jobs_rels_tags_id_idx" ON "jobs_rels" USING btree ("tags_id");
  CREATE INDEX "jobs_rels_jobs_id_idx" ON "jobs_rels" USING btree ("jobs_id");
  CREATE INDEX "orders_event_tickets_parking_tickets_order_idx" ON "orders_event_tickets_parking_tickets" USING btree ("_order");
  CREATE INDEX "orders_event_tickets_parking_tickets_parent_id_idx" ON "orders_event_tickets_parking_tickets" USING btree ("_parent_id");
  CREATE INDEX "orders_event_tickets_order_idx" ON "orders_event_tickets" USING btree ("_order");
  CREATE INDEX "orders_event_tickets_parent_id_idx" ON "orders_event_tickets" USING btree ("_parent_id");
  CREATE INDEX "orders_order_history_order_idx" ON "orders_order_history" USING btree ("_order");
  CREATE INDEX "orders_order_history_parent_id_idx" ON "orders_order_history" USING btree ("_parent_id");
  CREATE INDEX "orders_order_tags_idx" ON "orders" USING btree ("order_tags_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "orders__status_idx" ON "orders" USING btree ("_status");
  CREATE INDEX "_orders_v_version_event_tickets_parking_tickets_order_idx" ON "_orders_v_version_event_tickets_parking_tickets" USING btree ("_order");
  CREATE INDEX "_orders_v_version_event_tickets_parking_tickets_parent_id_idx" ON "_orders_v_version_event_tickets_parking_tickets" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_event_tickets_order_idx" ON "_orders_v_version_event_tickets" USING btree ("_order");
  CREATE INDEX "_orders_v_version_event_tickets_parent_id_idx" ON "_orders_v_version_event_tickets" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_version_order_history_order_idx" ON "_orders_v_version_order_history" USING btree ("_order");
  CREATE INDEX "_orders_v_version_order_history_parent_id_idx" ON "_orders_v_version_order_history" USING btree ("_parent_id");
  CREATE INDEX "_orders_v_parent_idx" ON "_orders_v" USING btree ("parent_id");
  CREATE INDEX "_orders_v_version_version_order_tags_idx" ON "_orders_v" USING btree ("version_order_tags_id");
  CREATE INDEX "_orders_v_version_version_updated_at_idx" ON "_orders_v" USING btree ("version_updated_at");
  CREATE INDEX "_orders_v_version_version_created_at_idx" ON "_orders_v" USING btree ("version_created_at");
  CREATE INDEX "_orders_v_version_version__status_idx" ON "_orders_v" USING btree ("version__status");
  CREATE INDEX "_orders_v_created_at_idx" ON "_orders_v" USING btree ("created_at");
  CREATE INDEX "_orders_v_updated_at_idx" ON "_orders_v" USING btree ("updated_at");
  CREATE INDEX "_orders_v_latest_idx" ON "_orders_v" USING btree ("latest");
  CREATE INDEX "_orders_v_autosave_idx" ON "_orders_v" USING btree ("autosave");
  CREATE INDEX "pools_connection_config_order_idx" ON "pools_connection_config" USING btree ("_order");
  CREATE INDEX "pools_connection_config_parent_id_idx" ON "pools_connection_config" USING btree ("_parent_id");
  CREATE INDEX "pools_updated_at_idx" ON "pools" USING btree ("updated_at");
  CREATE INDEX "pools_created_at_idx" ON "pools" USING btree ("created_at");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_tags_idx" ON "pages" USING btree ("tags_id");
  CREATE INDEX "pages_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_folder_idx" ON "pages" USING btree ("folder_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_tags_idx" ON "_pages_v" USING btree ("version_tags_id");
  CREATE INDEX "_pages_v_version_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_folder_idx" ON "_pages_v" USING btree ("version_folder_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
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
  CREATE INDEX "private_uploads_folder_idx" ON "private_uploads" USING btree ("folder_id");
  CREATE INDEX "private_uploads_updated_at_idx" ON "private_uploads" USING btree ("updated_at");
  CREATE INDEX "private_uploads_created_at_idx" ON "private_uploads" USING btree ("created_at");
  CREATE INDEX "private_uploads_deleted_at_idx" ON "private_uploads" USING btree ("deleted_at");
  CREATE UNIQUE INDEX "private_uploads_filename_idx" ON "private_uploads" USING btree ("filename");
  CREATE INDEX "private_uploads_rels_order_idx" ON "private_uploads_rels" USING btree ("order");
  CREATE INDEX "private_uploads_rels_parent_idx" ON "private_uploads_rels" USING btree ("parent_id");
  CREATE INDEX "private_uploads_rels_path_idx" ON "private_uploads_rels" USING btree ("path");
  CREATE INDEX "private_uploads_rels_users_id_idx" ON "private_uploads_rels" USING btree ("users_id");
  CREATE INDEX "handbook_tags_idx" ON "handbook" USING btree ("tags_id");
  CREATE INDEX "handbook_updated_at_idx" ON "handbook" USING btree ("updated_at");
  CREATE INDEX "handbook_created_at_idx" ON "handbook" USING btree ("created_at");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_user_info_options_order_idx" ON "forms_blocks_user_info_options" USING btree ("order");
  CREATE INDEX "forms_blocks_user_info_options_parent_idx" ON "forms_blocks_user_info_options" USING btree ("parent_id");
  CREATE INDEX "forms_blocks_user_info_order_idx" ON "forms_blocks_user_info" USING btree ("_order");
  CREATE INDEX "forms_blocks_user_info_parent_id_idx" ON "forms_blocks_user_info" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_user_info_path_idx" ON "forms_blocks_user_info" USING btree ("_path");
  CREATE INDEX "forms_blocks_phone_order_idx" ON "forms_blocks_phone" USING btree ("_order");
  CREATE INDEX "forms_blocks_phone_parent_id_idx" ON "forms_blocks_phone" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_phone_path_idx" ON "forms_blocks_phone" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_slug_idx" ON "forms" USING btree ("slug");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
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
  CREATE INDEX "payload_locked_documents_rels_tasks_id_idx" ON "payload_locked_documents_rels" USING btree ("tasks_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_pools_id_idx" ON "payload_locked_documents_rels" USING btree ("pools_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_payload_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_uploads_id");
  CREATE INDEX "payload_locked_documents_rels_private_uploads_id_idx" ON "payload_locked_documents_rels" USING btree ("private_uploads_id");
  CREATE INDEX "payload_locked_documents_rels_handbook_id_idx" ON "payload_locked_documents_rels" USING btree ("handbook_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
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
  CREATE INDEX "payload_query_presets_rels_users_id_idx" ON "payload_query_presets_rels" USING btree ("users_id");
  CREATE INDEX "global_footer_nav_items_order_idx" ON "global_footer_nav_items" USING btree ("_order");
  CREATE INDEX "global_footer_nav_items_parent_id_idx" ON "global_footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "global_footer_rels_order_idx" ON "global_footer_rels" USING btree ("order");
  CREATE INDEX "global_footer_rels_parent_idx" ON "global_footer_rels" USING btree ("parent_id");
  CREATE INDEX "global_footer_rels_path_idx" ON "global_footer_rels" USING btree ("path");
  CREATE INDEX "global_footer_rels_pages_id_idx" ON "global_footer_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "accounts" CASCADE;
  DROP TABLE "verifications" CASCADE;
  DROP TABLE "passkeys" CASCADE;
  DROP TABLE "admin_invitations" CASCADE;
  DROP TABLE "tasks" CASCADE;
  DROP TABLE "tasks_rels" CASCADE;
  DROP TABLE "jobs_if" CASCADE;
  DROP TABLE "jobs_then" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_rels" CASCADE;
  DROP TABLE "orders_event_tickets_parking_tickets" CASCADE;
  DROP TABLE "orders_event_tickets" CASCADE;
  DROP TABLE "orders_order_history" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "_orders_v_version_event_tickets_parking_tickets" CASCADE;
  DROP TABLE "_orders_v_version_event_tickets" CASCADE;
  DROP TABLE "_orders_v_version_order_history" CASCADE;
  DROP TABLE "_orders_v" CASCADE;
  DROP TABLE "pools_connection_config" CASCADE;
  DROP TABLE "pools" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "payload_uploads" CASCADE;
  DROP TABLE "private_uploads" CASCADE;
  DROP TABLE "private_uploads_rels" CASCADE;
  DROP TABLE "handbook" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_user_info_options" CASCADE;
  DROP TABLE "forms_blocks_user_info" CASCADE;
  DROP TABLE "forms_blocks_phone" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "audit_log" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "payload_query_presets" CASCADE;
  DROP TABLE "payload_query_presets_rels" CASCADE;
  DROP TABLE "global_footer_nav_items" CASCADE;
  DROP TABLE "global_footer" CASCADE;
  DROP TABLE "global_footer_rels" CASCADE;
  DROP TABLE "global_terms" CASCADE;
  DROP TABLE "global_privacy" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TYPE "public"."enum_users_user_role";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_admin_invitations_role";
  DROP TYPE "public"."enum_tasks_type";
  DROP TYPE "public"."enum_tasks_task_status";
  DROP TYPE "public"."enum_jobs_if_filter";
  DROP TYPE "public"."enum_jobs_then_task_status";
  DROP TYPE "public"."enum_jobs_job_status";
  DROP TYPE "public"."enum_jobs_when_trigger";
  DROP TYPE "public"."enum_jobs_when_target_collections";
  DROP TYPE "public"."enum_orders_event_tickets_parking_tickets_source";
  DROP TYPE "public"."enum_orders_event_tickets_parking_tickets_type";
  DROP TYPE "public"."enum_orders_event_tickets_parking_tickets_status";
  DROP TYPE "public"."enum_orders_event_tickets_marketplace";
  DROP TYPE "public"."enum_orders_order_history_source";
  DROP TYPE "public"."enum_orders_order_history_type";
  DROP TYPE "public"."enum_orders_order_history_status";
  DROP TYPE "public"."enum_orders_order_status";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_source";
  DROP TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_type";
  DROP TYPE "public"."enum__orders_v_version_event_tickets_parking_tickets_status";
  DROP TYPE "public"."enum__orders_v_version_event_tickets_marketplace";
  DROP TYPE "public"."enum__orders_v_version_order_history_source";
  DROP TYPE "public"."enum__orders_v_version_order_history_type";
  DROP TYPE "public"."enum__orders_v_version_order_history_status";
  DROP TYPE "public"."enum__orders_v_version_order_status";
  DROP TYPE "public"."enum__orders_v_version_status";
  DROP TYPE "public"."enum_pools_connection_config_auth_type";
  DROP TYPE "public"."enum_pools_pool_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_forms_blocks_email_width";
  DROP TYPE "public"."enum_forms_blocks_text_width";
  DROP TYPE "public"."enum_forms_blocks_user_info_options";
  DROP TYPE "public"."enum_forms_blocks_user_info_width";
  DROP TYPE "public"."enum_forms_blocks_phone_width";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_audit_log_type";
  DROP TYPE "public"."enum_payload_query_presets_access_read_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_update_constraint";
  DROP TYPE "public"."enum_payload_query_presets_access_delete_constraint";
  DROP TYPE "public"."enum_payload_query_presets_related_collection";
  DROP TYPE "public"."enum_global_footer_nav_items_link_type";`)
}
