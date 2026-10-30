CREATE TABLE "action_log_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"type_title" varchar(255) DEFAULT '' NOT NULL,
	"type_alias" varchar(255) DEFAULT '' NOT NULL,
	"id_holder" varchar(255),
	"title_holder" varchar(255),
	"table_name" varchar(255),
	"text_prefix" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "action_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_language_key" varchar(255) DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"log_date" timestamp NOT NULL,
	"extension" varchar(50) DEFAULT '' NOT NULL,
	"user_id" integer DEFAULT 0 NOT NULL,
	"item_id" integer DEFAULT 0 NOT NULL,
	"ip_address" varchar(40) DEFAULT '0.0.0.0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "action_logs_extensions" (
	"id" serial PRIMARY KEY NOT NULL,
	"extension" varchar(50) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "action_logs_users" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"notify" boolean NOT NULL,
	"extensions" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "associations" (
	"id" integer NOT NULL,
	"context" varchar(50) NOT NULL,
	"key" char(32) NOT NULL,
	CONSTRAINT "associations_context_id_pk" PRIMARY KEY("context","id")
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" bigint DEFAULT 0 NOT NULL,
	"lft" bigint DEFAULT 0 NOT NULL,
	"rgt" bigint DEFAULT 0 NOT NULL,
	"level" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"title" varchar(100) NOT NULL,
	"rules" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banner_clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"contact" varchar(255) DEFAULT '' NOT NULL,
	"email" varchar(255) DEFAULT '' NOT NULL,
	"extrainfo" text NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"metakey" text,
	"own_prefix" boolean DEFAULT false NOT NULL,
	"metakey_prefix" varchar(255) DEFAULT '' NOT NULL,
	"purchase_type" smallint DEFAULT -1 NOT NULL,
	"track_clicks" smallint DEFAULT -1 NOT NULL,
	"track_impressions" smallint DEFAULT -1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "banner_tracks" (
	"track_date" timestamp NOT NULL,
	"track_type" bigint NOT NULL,
	"banner_id" bigint NOT NULL,
	"count" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "banner_tracks_track_date_track_type_banner_id_pk" PRIMARY KEY("track_date","track_type","banner_id")
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"cid" bigint DEFAULT 0 NOT NULL,
	"type" bigint DEFAULT 0 NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"alias" varchar(255) DEFAULT '' NOT NULL,
	"imptotal" bigint DEFAULT 0 NOT NULL,
	"impmade" bigint DEFAULT 0 NOT NULL,
	"clicks" bigint DEFAULT 0 NOT NULL,
	"clickurl" varchar(2048) DEFAULT '' NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"catid" bigint DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"custombannercode" varchar(2048) NOT NULL,
	"sticky" boolean DEFAULT false NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"metakey" text,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"own_prefix" boolean DEFAULT false NOT NULL,
	"metakey_prefix" varchar(255) DEFAULT '' NOT NULL,
	"purchase_type" smallint DEFAULT -1 NOT NULL,
	"track_clicks" smallint DEFAULT -1 NOT NULL,
	"track_impressions" smallint DEFAULT -1 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"publish_up" timestamp,
	"publish_down" timestamp,
	"reset" timestamp,
	"created" timestamp NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"parent_id" integer DEFAULT 0 NOT NULL,
	"lft" bigint DEFAULT 0 NOT NULL,
	"rgt" bigint DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"path" varchar(255) DEFAULT '' NOT NULL,
	"extension" varchar(50) DEFAULT '' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"alias" varchar(255) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"description" text,
	"published" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"access" bigint DEFAULT 0 NOT NULL,
	"params" jsonb,
	"metadesc" varchar(1024) DEFAULT '' NOT NULL,
	"metakey" varchar(1024) DEFAULT '' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_user_id" integer DEFAULT 0 NOT NULL,
	"created_time" timestamp NOT NULL,
	"modified_user_id" integer DEFAULT 0 NOT NULL,
	"modified_time" timestamp NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"alias" varchar(255) NOT NULL,
	"con_position" varchar(255),
	"address" text,
	"suburb" varchar(100),
	"state" varchar(100),
	"country" varchar(100),
	"postcode" varchar(100),
	"telephone" varchar(255),
	"fax" varchar(255),
	"misc" text,
	"image" varchar(255),
	"email_to" varchar(255),
	"default_con" boolean DEFAULT false NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"user_id" bigint DEFAULT 0 NOT NULL,
	"catid" bigint DEFAULT 0 NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"mobile" varchar(255) DEFAULT '' NOT NULL,
	"webpage" varchar(255) DEFAULT '' NOT NULL,
	"sortname1" varchar(255) DEFAULT '' NOT NULL,
	"sortname2" varchar(255) DEFAULT '' NOT NULL,
	"sortname3" varchar(255) DEFAULT '' NOT NULL,
	"language" varchar(7) NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" integer DEFAULT 0 NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" integer DEFAULT 0 NOT NULL,
	"metakey" text,
	"metadesc" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"publish_up" timestamp,
	"publish_down" timestamp,
	"version" bigint DEFAULT 1 NOT NULL,
	"hits" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"alias" varchar(255) DEFAULT '' NOT NULL,
	"introtext" text NOT NULL,
	"fulltext" text NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"catid" bigint DEFAULT 0 NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"publish_up" timestamp,
	"publish_down" timestamp,
	"images" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"urls" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"attribs" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"metakey" text,
	"metadesc" text NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"hits" bigint DEFAULT 0 NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_frontpage" (
	"content_id" bigint PRIMARY KEY DEFAULT 0 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"featured_up" timestamp,
	"featured_down" timestamp
);
--> statement-breakpoint
CREATE TABLE "contentitem_tag_map" (
	"type_alias" varchar(255) DEFAULT '' NOT NULL,
	"core_content_id" integer NOT NULL,
	"content_item_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"tag_date" timestamp DEFAULT '1970-01-01 00:00:00.000' NOT NULL,
	"type_id" integer NOT NULL,
	CONSTRAINT "contentitem_tag_map_type_id_content_item_id_tag_id_pk" PRIMARY KEY("type_id","content_item_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "content_rating" (
	"content_id" bigint PRIMARY KEY DEFAULT 0 NOT NULL,
	"rating_sum" bigint DEFAULT 0 NOT NULL,
	"rating_count" bigint DEFAULT 0 NOT NULL,
	"lastip" varchar(50) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_types" (
	"type_id" serial PRIMARY KEY NOT NULL,
	"type_title" varchar(255) DEFAULT '' NOT NULL,
	"type_alias" varchar(255) DEFAULT '' NOT NULL,
	"table" varchar(2048) DEFAULT '' NOT NULL,
	"rules" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"field_mappings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"router" varchar(255) DEFAULT '' NOT NULL,
	"content_history_options" jsonb
);
--> statement-breakpoint
CREATE TABLE "extensions" (
	"extension_id" serial PRIMARY KEY NOT NULL,
	"package_id" bigint DEFAULT 0 NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"element" varchar(100) NOT NULL,
	"changelogurl" text,
	"folder" varchar(100) NOT NULL,
	"client_id" smallint NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"access" bigint DEFAULT 1 NOT NULL,
	"protected" boolean DEFAULT false NOT NULL,
	"locked" boolean DEFAULT false NOT NULL,
	"manifest_cache" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"custom_data" text NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"ordering" bigint DEFAULT 0,
	"state" bigint DEFAULT 0,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "fields" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"context" varchar(255) DEFAULT '' NOT NULL,
	"group_id" bigint DEFAULT 0 NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"label" varchar(255) DEFAULT '' NOT NULL,
	"default_value" text,
	"type" varchar(255) DEFAULT 'text' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"required" boolean DEFAULT false NOT NULL,
	"only_use_in_subform" boolean DEFAULT false NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"fieldparams" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"created_time" timestamp NOT NULL,
	"created_user_id" bigint DEFAULT 0 NOT NULL,
	"modified_time" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fields_categories" (
	"field_id" bigint DEFAULT 0 NOT NULL,
	"category_id" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "fields_categories_field_id_category_id_pk" PRIMARY KEY("field_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "fields_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"context" varchar(255) DEFAULT '' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"ordering" integer DEFAULT 0 NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"access" bigint DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fields_values" (
	"field_id" bigint DEFAULT 0 NOT NULL,
	"item_id" varchar(255) DEFAULT '' NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE "finder_filters" (
	"filter_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"alias" varchar(255) NOT NULL,
	"state" smallint DEFAULT 1 NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" integer DEFAULT 0 NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" integer DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"map_count" integer DEFAULT 0 NOT NULL,
	"data" jsonb,
	"params" jsonb
);
--> statement-breakpoint
CREATE TABLE "finder_links" (
	"link_id" serial PRIMARY KEY NOT NULL,
	"url" varchar(255) NOT NULL,
	"route" varchar(400) NOT NULL,
	"title" varchar(400),
	"description" text,
	"indexdate" timestamp NOT NULL,
	"md5sum" varchar(32),
	"published" boolean DEFAULT true NOT NULL,
	"state" integer DEFAULT 1 NOT NULL,
	"access" integer DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"publish_start_date" timestamp,
	"publish_end_date" timestamp,
	"start_date" timestamp,
	"end_date" timestamp,
	"list_price" numeric(8, 2) DEFAULT '0' NOT NULL,
	"sale_price" numeric(8, 2) DEFAULT '0' NOT NULL,
	"type_id" bigint NOT NULL,
	"object" text
);
--> statement-breakpoint
CREATE TABLE "finder_links_terms" (
	"link_id" integer NOT NULL,
	"term_id" integer NOT NULL,
	"weight" numeric(8, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "finder_links_terms_link_id_term_id_pk" PRIMARY KEY("link_id","term_id")
);
--> statement-breakpoint
CREATE TABLE "finder_logging" (
	"searchterm" varchar(255) DEFAULT '' NOT NULL,
	"md5sum" varchar(32) PRIMARY KEY DEFAULT '' NOT NULL,
	"query" text NOT NULL,
	"hits" integer DEFAULT 1 NOT NULL,
	"results" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_taxonomy" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer DEFAULT 0 NOT NULL,
	"lft" integer DEFAULT 0 NOT NULL,
	"rgt" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"path" varchar(400) DEFAULT '' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"alias" varchar(400) DEFAULT '' NOT NULL,
	"state" smallint DEFAULT 1 NOT NULL,
	"access" smallint DEFAULT 1 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_taxonomy_map" (
	"link_id" integer NOT NULL,
	"node_id" integer NOT NULL,
	CONSTRAINT "finder_taxonomy_map_link_id_node_id_pk" PRIMARY KEY("link_id","node_id")
);
--> statement-breakpoint
CREATE TABLE "finder_terms" (
	"term_id" serial PRIMARY KEY NOT NULL,
	"term" varchar(75) NOT NULL,
	"stem" varchar(75) DEFAULT '' NOT NULL,
	"common" boolean DEFAULT false NOT NULL,
	"phrase" boolean DEFAULT false NOT NULL,
	"weight" numeric(8, 2) DEFAULT '0' NOT NULL,
	"soundex" varchar(75) DEFAULT '' NOT NULL,
	"links" integer DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_terms_common" (
	"term" varchar(75) NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"custom" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_tokens" (
	"term" varchar(75) NOT NULL,
	"stem" varchar(75) DEFAULT '' NOT NULL,
	"common" boolean DEFAULT false NOT NULL,
	"phrase" boolean DEFAULT false NOT NULL,
	"weight" numeric(8, 2) DEFAULT '1' NOT NULL,
	"context" smallint DEFAULT 2 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_tokens_aggregate" (
	"term_id" integer NOT NULL,
	"term" varchar(75) NOT NULL,
	"stem" varchar(75) DEFAULT '' NOT NULL,
	"common" boolean DEFAULT false NOT NULL,
	"phrase" boolean DEFAULT false NOT NULL,
	"term_weight" numeric(8, 2) DEFAULT '0' NOT NULL,
	"context" smallint DEFAULT 2 NOT NULL,
	"context_weight" numeric(8, 2) DEFAULT '0' NOT NULL,
	"total_weight" numeric(8, 2) DEFAULT '0' NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "finder_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"mime" varchar(100) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guidedtours" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"uid" varchar(255) DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"extensions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"url" varchar(255) NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"checked_out_time" timestamp,
	"checked_out" integer,
	"published" smallint DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"autostart" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guidedtour_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"tour_id" bigint DEFAULT 0 NOT NULL,
	"title" varchar(255) NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"position" varchar(255) NOT NULL,
	"target" varchar(255) NOT NULL,
	"type" bigint NOT NULL,
	"interactive_type" bigint DEFAULT 1 NOT NULL,
	"url" varchar(255) NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"checked_out_time" timestamp,
	"checked_out" integer,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"params" jsonb
);
--> statement-breakpoint
CREATE TABLE "history" (
	"version_id" serial PRIMARY KEY NOT NULL,
	"item_id" varchar(50) NOT NULL,
	"version_note" varchar(255) DEFAULT '' NOT NULL,
	"save_date" timestamp with time zone NOT NULL,
	"editor_user_id" integer DEFAULT 0 NOT NULL,
	"character_count" integer DEFAULT 0 NOT NULL,
	"sha1_hash" varchar(50) DEFAULT '' NOT NULL,
	"version_data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"keep_forever" boolean DEFAULT false NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"is_legacy" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"lang_id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"lang_code" varchar(7) NOT NULL,
	"title" varchar(50) NOT NULL,
	"title_native" varchar(50) NOT NULL,
	"sef" varchar(50) NOT NULL,
	"image" varchar(50) NOT NULL,
	"description" varchar(512) NOT NULL,
	"metakey" text,
	"metadesc" text NOT NULL,
	"sitename" varchar(1024) DEFAULT '' NOT NULL,
	"published" bigint DEFAULT 0 NOT NULL,
	"access" integer DEFAULT 0 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mail_templates" (
	"template_id" varchar(127) DEFAULT '' NOT NULL,
	"extension" varchar(127) DEFAULT '' NOT NULL,
	"language" char(7) DEFAULT '' NOT NULL,
	"subject" varchar(255) DEFAULT '' NOT NULL,
	"body" text NOT NULL,
	"htmlbody" text NOT NULL,
	"attachments" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"menutype" varchar(24) NOT NULL,
	"title" varchar(255) NOT NULL,
	"alias" varchar(255) NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"path" varchar(1024) DEFAULT '' NOT NULL,
	"link" varchar(1024) NOT NULL,
	"type" varchar(16) NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"parent_id" integer DEFAULT 1 NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"component_id" integer DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"browserNav" smallint DEFAULT 0 NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"img" varchar(255) DEFAULT '' NOT NULL,
	"template_style_id" integer DEFAULT 0 NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"lft" bigint DEFAULT 0 NOT NULL,
	"rgt" bigint DEFAULT 0 NOT NULL,
	"home" boolean DEFAULT false NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"client_id" smallint DEFAULT 0 NOT NULL,
	"publish_up" timestamp,
	"publish_down" timestamp
);
--> statement-breakpoint
CREATE TABLE "menu_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"menutype" varchar(24) NOT NULL,
	"title" varchar(48) NOT NULL,
	"description" varchar(255) DEFAULT '' NOT NULL,
	"client_id" integer DEFAULT 0 NOT NULL,
	"ordering" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"message_id" serial PRIMARY KEY NOT NULL,
	"user_id_from" bigint DEFAULT 0 NOT NULL,
	"user_id_to" bigint DEFAULT 0 NOT NULL,
	"folder_id" smallint DEFAULT 0 NOT NULL,
	"date_time" timestamp NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"priority" smallint DEFAULT 0 NOT NULL,
	"subject" varchar(255) DEFAULT '' NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages_cfg" (
	"user_id" bigint DEFAULT 0 NOT NULL,
	"cfg_name" varchar(100) DEFAULT '' NOT NULL,
	"cfg_value" varchar(255) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"title" varchar(100) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"content" text,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"position" varchar(50) DEFAULT '' NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"publish_up" timestamp,
	"publish_down" timestamp,
	"published" boolean DEFAULT false NOT NULL,
	"module" varchar(50) DEFAULT '' NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"showtitle" boolean DEFAULT true NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"client_id" smallint DEFAULT 0 NOT NULL,
	"language" varchar(7) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modules_menu" (
	"moduleid" bigint DEFAULT 0 NOT NULL,
	"menuid" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "modules_menu_moduleid_menuid_pk" PRIMARY KEY("moduleid","menuid")
);
--> statement-breakpoint
CREATE TABLE "newsfeeds" (
	"catid" bigint DEFAULT 0 NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) DEFAULT '' NOT NULL,
	"alias" varchar(100) DEFAULT '' NOT NULL,
	"link" varchar(2048) DEFAULT '' NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"numarticles" bigint DEFAULT 1 NOT NULL,
	"cache_time" bigint DEFAULT 3600 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"rtl" boolean DEFAULT false NOT NULL,
	"access" bigint DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" integer DEFAULT 0 NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" integer DEFAULT 0 NOT NULL,
	"metakey" text,
	"metadesc" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"publish_up" timestamp,
	"publish_down" timestamp,
	"description" text NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL,
	"hits" bigint DEFAULT 0 NOT NULL,
	"images" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "overrider" (
	"id" serial PRIMARY KEY NOT NULL,
	"constant" varchar(255) NOT NULL,
	"string" text NOT NULL,
	"file" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postinstall_messages" (
	"postinstall_message_id" serial PRIMARY KEY NOT NULL,
	"extension_id" bigint DEFAULT 700 NOT NULL,
	"title_key" varchar(255) DEFAULT '' NOT NULL,
	"description_key" varchar(255) DEFAULT '' NOT NULL,
	"action_key" varchar(255) DEFAULT '' NOT NULL,
	"language_extension" varchar(255) DEFAULT 'com_postinstall' NOT NULL,
	"language_client_id" smallint DEFAULT 1 NOT NULL,
	"type" varchar(10) DEFAULT 'link' NOT NULL,
	"action_file" varchar(255) DEFAULT '',
	"action" varchar(255) DEFAULT '',
	"condition_file" varchar(255),
	"condition_method" varchar(255),
	"version_introduced" varchar(255) DEFAULT '3.2.0' NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "privacy_consents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" bigint DEFAULT 0 NOT NULL,
	"state" smallint DEFAULT 1 NOT NULL,
	"created" timestamp NOT NULL,
	"subject" varchar(255) DEFAULT '' NOT NULL,
	"body" text NOT NULL,
	"remind" boolean DEFAULT false NOT NULL,
	"token" varchar(100) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "privacy_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) DEFAULT '' NOT NULL,
	"requested_at" timestamp NOT NULL,
	"status" smallint DEFAULT 0 NOT NULL,
	"request_type" varchar(25) DEFAULT '' NOT NULL,
	"confirm_token" varchar(100) DEFAULT '' NOT NULL,
	"confirm_token_created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "redirect_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"old_url" varchar(2048) NOT NULL,
	"new_url" varchar(2048),
	"referer" varchar(2048) NOT NULL,
	"comment" varchar(255) DEFAULT '' NOT NULL,
	"hits" bigint DEFAULT 0 NOT NULL,
	"published" boolean NOT NULL,
	"created_date" timestamp NOT NULL,
	"modified_date" timestamp NOT NULL,
	"header" integer DEFAULT 301 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheduler_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"taskname" varchar(255) DEFAULT '' NOT NULL,
	"tasktype" varchar(128) NOT NULL,
	"duration" numeric(5, 3) NOT NULL,
	"jobid" integer NOT NULL,
	"taskid" integer NOT NULL,
	"exitcode" integer NOT NULL,
	"lastdate" timestamp,
	"nextdate" timestamp
);
--> statement-breakpoint
CREATE TABLE "scheduler_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar(128) NOT NULL,
	"execution_rules" jsonb,
	"cron_rules" jsonb,
	"state" smallint DEFAULT 0 NOT NULL,
	"last_exit_code" integer DEFAULT 0 NOT NULL,
	"last_execution" timestamp,
	"next_execution" timestamp,
	"times_executed" integer DEFAULT 0 NOT NULL,
	"times_failed" integer DEFAULT 0,
	"locked" timestamp,
	"priority" smallint DEFAULT 0 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"cli_exclusive" boolean DEFAULT false NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"note" text,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "schemaorg" (
	"id" serial PRIMARY KEY NOT NULL,
	"itemId" bigint,
	"context" varchar(100),
	"schemaType" varchar(100),
	"schema" jsonb
);
--> statement-breakpoint
CREATE TABLE "schemas" (
	"extension_id" bigint NOT NULL,
	"version_id" varchar(20) NOT NULL,
	CONSTRAINT "schemas_extension_id_version_id_pk" PRIMARY KEY("extension_id","version_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"session_id" text PRIMARY KEY NOT NULL,
	"client_id" smallint,
	"guest" boolean DEFAULT true,
	"time" integer DEFAULT 0 NOT NULL,
	"data" text,
	"userid" bigint DEFAULT 0,
	"username" varchar(150) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" bigint DEFAULT 0 NOT NULL,
	"lft" bigint DEFAULT 0 NOT NULL,
	"rgt" bigint DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"path" varchar(255) DEFAULT '' NOT NULL,
	"title" varchar(255) NOT NULL,
	"alias" varchar(255) DEFAULT '' NOT NULL,
	"note" varchar(255) DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"access" bigint DEFAULT 0 NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"metadesc" varchar(1024) NOT NULL,
	"metakey" varchar(1024) DEFAULT '' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_user_id" integer DEFAULT 0 NOT NULL,
	"created_time" timestamp NOT NULL,
	"created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"modified_user_id" integer DEFAULT 0 NOT NULL,
	"modified_time" timestamp NOT NULL,
	"images" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"urls" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	"language" varchar(7) DEFAULT '' NOT NULL,
	"version" bigint DEFAULT 1 NOT NULL,
	"publish_up" timestamp,
	"publish_down" timestamp
);
--> statement-breakpoint
CREATE TABLE "template_overrides" (
	"id" serial PRIMARY KEY NOT NULL,
	"template" varchar(50) DEFAULT '' NOT NULL,
	"hash_id" varchar(255) DEFAULT '' NOT NULL,
	"extension_id" bigint DEFAULT 0,
	"state" smallint DEFAULT 0 NOT NULL,
	"action" varchar(50) DEFAULT '' NOT NULL,
	"client_id" smallint DEFAULT 0 NOT NULL,
	"created_date" timestamp NOT NULL,
	"modified_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "template_styles" (
	"id" serial PRIMARY KEY NOT NULL,
	"template" varchar(50) DEFAULT '' NOT NULL,
	"client_id" smallint DEFAULT 0 NOT NULL,
	"home" varchar(7) DEFAULT '0' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"inheritable" smallint DEFAULT 0 NOT NULL,
	"parent" varchar(50) DEFAULT '',
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tuf_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"update_site_id" bigint DEFAULT 0 NOT NULL,
	"root" jsonb,
	"targets" jsonb,
	"snapshot" jsonb,
	"timestamp" jsonb,
	"mirrors" jsonb
);
--> statement-breakpoint
CREATE TABLE "ucm_base" (
	"ucm_id" serial PRIMARY KEY NOT NULL,
	"ucm_item_id" bigint NOT NULL,
	"ucm_type_id" bigint NOT NULL,
	"ucm_language_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ucm_content" (
	"core_content_id" serial PRIMARY KEY NOT NULL,
	"core_type_alias" varchar(255) DEFAULT '' NOT NULL,
	"core_title" varchar(255) DEFAULT '' NOT NULL,
	"core_alias" varchar(255) DEFAULT '' NOT NULL,
	"core_body" text,
	"core_state" smallint DEFAULT 0 NOT NULL,
	"core_checked_out_time" timestamp,
	"core_checked_out_user_id" integer,
	"core_access" bigint DEFAULT 0 NOT NULL,
	"core_params" jsonb,
	"core_featured" boolean DEFAULT false NOT NULL,
	"core_metadata" jsonb,
	"core_created_user_id" bigint DEFAULT 0 NOT NULL,
	"core_created_by_alias" varchar(255) DEFAULT '' NOT NULL,
	"core_created_time" timestamp NOT NULL,
	"core_modified_user_id" bigint DEFAULT 0 NOT NULL,
	"core_modified_time" timestamp NOT NULL,
	"core_language" varchar(7) DEFAULT '' NOT NULL,
	"core_publish_up" timestamp,
	"core_publish_down" timestamp,
	"core_content_item_id" bigint DEFAULT 0 NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"core_images" jsonb,
	"core_urls" jsonb,
	"core_hits" bigint DEFAULT 0 NOT NULL,
	"core_version" bigint DEFAULT 1 NOT NULL,
	"core_ordering" bigint DEFAULT 0 NOT NULL,
	"core_metakey" text,
	"core_metadesc" text,
	"core_catid" bigint DEFAULT 0 NOT NULL,
	"core_type_id" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "update_sites" (
	"update_site_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) DEFAULT '',
	"type" varchar(20) DEFAULT '',
	"location" text NOT NULL,
	"enabled" boolean DEFAULT false,
	"last_check_timestamp" bigint DEFAULT 0,
	"extra_query" varchar(1000) DEFAULT '',
	"checked_out" integer,
	"checked_out_time" timestamp
);
--> statement-breakpoint
CREATE TABLE "update_sites_extensions" (
	"update_site_id" bigint DEFAULT 0 NOT NULL,
	"extension_id" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "update_sites_extensions_update_site_id_extension_id_pk" PRIMARY KEY("update_site_id","extension_id")
);
--> statement-breakpoint
CREATE TABLE "updates" (
	"update_id" serial PRIMARY KEY NOT NULL,
	"update_site_id" bigint DEFAULT 0,
	"extension_id" bigint DEFAULT 0,
	"name" varchar(100) DEFAULT '',
	"description" text NOT NULL,
	"element" varchar(100) DEFAULT '',
	"type" varchar(20) DEFAULT '',
	"folder" varchar(20) DEFAULT '',
	"client_id" smallint DEFAULT 0,
	"version" varchar(32) DEFAULT '',
	"data" text NOT NULL,
	"detailsurl" text NOT NULL,
	"infourl" text NOT NULL,
	"changelogurl" text,
	"extra_query" varchar(1000) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE "usergroups" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" bigint DEFAULT 0 NOT NULL,
	"lft" bigint DEFAULT 0 NOT NULL,
	"rgt" bigint DEFAULT 0 NOT NULL,
	"title" varchar(100) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"series" varchar(255) NOT NULL,
	"time" varchar(200) NOT NULL,
	"uastring" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_mfa" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"method" varchar(100) NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"options" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_on" timestamp NOT NULL,
	"last_used" timestamp,
	"tries" bigint DEFAULT 0 NOT NULL,
	"last_try" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer DEFAULT 0 NOT NULL,
	"catid" integer DEFAULT 0 NOT NULL,
	"subject" varchar(100) DEFAULT '' NOT NULL,
	"body" text NOT NULL,
	"state" smallint DEFAULT 0 NOT NULL,
	"checked_out" integer,
	"checked_out_time" timestamp,
	"created_user_id" integer DEFAULT 0 NOT NULL,
	"created_time" timestamp NOT NULL,
	"modified_user_id" integer DEFAULT 0 NOT NULL,
	"modified_time" timestamp NOT NULL,
	"review_time" timestamp,
	"publish_up" timestamp,
	"publish_down" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"user_id" bigint NOT NULL,
	"profile_key" varchar(100) NOT NULL,
	"profile_value" text NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"username" varchar(150) DEFAULT '' NOT NULL,
	"email" varchar(100) DEFAULT '' NOT NULL,
	"password" varchar(100) DEFAULT '' NOT NULL,
	"block" boolean DEFAULT false NOT NULL,
	"sendEmail" boolean DEFAULT false,
	"registerDate" timestamp NOT NULL,
	"lastvisitDate" timestamp,
	"activation" varchar(100) DEFAULT '' NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"lastResetTime" timestamp,
	"resetCount" bigint DEFAULT 0 NOT NULL,
	"otpKey" varchar(1000) DEFAULT '' NOT NULL,
	"otep" varchar(1000) DEFAULT '' NOT NULL,
	"requireReset" boolean DEFAULT false,
	"authProvider" varchar(100) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_usergroup_map" (
	"user_id" bigint DEFAULT 0 NOT NULL,
	"group_id" bigint DEFAULT 0 NOT NULL,
	CONSTRAINT "user_usergroup_map_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE "viewlevels" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) DEFAULT '' NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"rules" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webauthn_credentials" (
	"id" varchar(1000) PRIMARY KEY NOT NULL,
	"user_id" varchar(128) NOT NULL,
	"label" varchar(190) NOT NULL,
	"credential" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workflow_associations" (
	"item_id" bigint DEFAULT 0 NOT NULL,
	"stage_id" bigint DEFAULT 0 NOT NULL,
	"extension" varchar(50) NOT NULL,
	CONSTRAINT "workflow_associations_item_id_extension_pk" PRIMARY KEY("item_id","extension")
);
--> statement-breakpoint
CREATE TABLE "workflows" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"description" text NOT NULL,
	"extension" varchar(50) NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"created" timestamp NOT NULL,
	"created_by" bigint DEFAULT 0 NOT NULL,
	"modified" timestamp NOT NULL,
	"modified_by" bigint DEFAULT 0 NOT NULL,
	"checked_out_time" timestamp,
	"checked_out" integer
);
--> statement-breakpoint
CREATE TABLE "workflow_stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"workflow_id" bigint DEFAULT 0 NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"checked_out_time" timestamp,
	"checked_out" integer
);
--> statement-breakpoint
CREATE TABLE "workflow_transitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" bigint DEFAULT 0 NOT NULL,
	"ordering" bigint DEFAULT 0 NOT NULL,
	"workflow_id" bigint DEFAULT 0 NOT NULL,
	"published" smallint DEFAULT 0 NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"from_stage_id" bigint DEFAULT 0 NOT NULL,
	"to_stage_id" bigint DEFAULT 0 NOT NULL,
	"options" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"checked_out_time" timestamp,
	"checked_out" integer
);
--> statement-breakpoint
CREATE INDEX "action_logs_idx_user_id" ON "action_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "action_logs_idx_user_id_logdate" ON "action_logs" USING btree ("user_id","log_date");--> statement-breakpoint
CREATE INDEX "action_logs_idx_user_id_extension" ON "action_logs" USING btree ("user_id","extension");--> statement-breakpoint
CREATE INDEX "action_logs_idx_extension_itemid" ON "action_logs" USING btree ("extension","item_id");--> statement-breakpoint
CREATE INDEX "action_logs_users_idx_notify" ON "action_logs_users" USING btree ("notify");--> statement-breakpoint
CREATE INDEX "associations_idx_key" ON "associations" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX "assets_idx_asset_name" ON "assets" USING btree ("name");--> statement-breakpoint
CREATE INDEX "assets_idx_lft_rgt" ON "assets" USING btree ("lft","rgt");--> statement-breakpoint
CREATE INDEX "assets_idx_parent_id" ON "assets" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "banner_clients_idx_own_prefix" ON "banner_clients" USING btree ("own_prefix");--> statement-breakpoint
CREATE INDEX "banner_clients_idx_metakey_prefix" ON "banner_clients" USING btree ("metakey_prefix");--> statement-breakpoint
CREATE INDEX "banner_tracks_idx_track_date" ON "banner_tracks" USING btree ("track_date");--> statement-breakpoint
CREATE INDEX "banner_tracks_idx_track_type" ON "banner_tracks" USING btree ("track_type");--> statement-breakpoint
CREATE INDEX "banner_tracks_idx_banner_id" ON "banner_tracks" USING btree ("banner_id");--> statement-breakpoint
CREATE INDEX "banners_idx_state" ON "banners" USING btree ("state");--> statement-breakpoint
CREATE INDEX "banners_idx_own_prefix" ON "banners" USING btree ("own_prefix");--> statement-breakpoint
CREATE INDEX "banners_idx_metakey_prefix" ON "banners" USING btree ("metakey_prefix");--> statement-breakpoint
CREATE INDEX "banners_idx_banner_catid" ON "banners" USING btree ("catid");--> statement-breakpoint
CREATE INDEX "banners_idx_language" ON "banners" USING btree ("language");--> statement-breakpoint
CREATE INDEX "categories_cat_idx" ON "categories" USING btree ("extension","published","access");--> statement-breakpoint
CREATE INDEX "categories_idx_access" ON "categories" USING btree ("access");--> statement-breakpoint
CREATE INDEX "categories_idx_checkout" ON "categories" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "categories_idx_path" ON "categories" USING btree ("path");--> statement-breakpoint
CREATE INDEX "categories_idx_left_right" ON "categories" USING btree ("lft","rgt");--> statement-breakpoint
CREATE INDEX "categories_idx_alias" ON "categories" USING btree ("alias");--> statement-breakpoint
CREATE INDEX "categories_idx_language" ON "categories" USING btree ("language");--> statement-breakpoint
CREATE INDEX "contact_details_idx_access" ON "contact_details" USING btree ("access");--> statement-breakpoint
CREATE INDEX "contact_details_idx_checkout" ON "contact_details" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "contact_details_idx_state" ON "contact_details" USING btree ("published");--> statement-breakpoint
CREATE INDEX "contact_details_idx_catid" ON "contact_details" USING btree ("catid");--> statement-breakpoint
CREATE INDEX "contact_details_idx_createdby" ON "contact_details" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "contact_details_idx_featured_catid" ON "contact_details" USING btree ("featured","catid");--> statement-breakpoint
CREATE INDEX "contact_details_idx_language" ON "contact_details" USING btree ("language");--> statement-breakpoint
CREATE INDEX "content_idx_access" ON "content" USING btree ("access");--> statement-breakpoint
CREATE INDEX "content_idx_checkout" ON "content" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "content_idx_state" ON "content" USING btree ("state");--> statement-breakpoint
CREATE INDEX "content_idx_catid" ON "content" USING btree ("catid");--> statement-breakpoint
CREATE INDEX "content_idx_createdby" ON "content" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "content_idx_featured_catid" ON "content" USING btree ("featured","catid");--> statement-breakpoint
CREATE INDEX "content_idx_language" ON "content" USING btree ("language");--> statement-breakpoint
CREATE INDEX "content_idx_alias" ON "content" USING btree ("alias");--> statement-breakpoint
CREATE INDEX "contentitem_tag_map_idx_tag_type" ON "contentitem_tag_map" USING btree ("tag_id","type_id");--> statement-breakpoint
CREATE INDEX "contentitem_tag_map_idx_date_id" ON "contentitem_tag_map" USING btree ("tag_date","tag_id");--> statement-breakpoint
CREATE INDEX "contentitem_tag_map_idx_core_content_id" ON "contentitem_tag_map" USING btree ("core_content_id");--> statement-breakpoint
CREATE INDEX "content_types_idx_alias" ON "content_types" USING btree ("type_alias");--> statement-breakpoint
CREATE INDEX "extensions_element_clientid" ON "extensions" USING btree ("element","client_id");--> statement-breakpoint
CREATE INDEX "extensions_element_folder_clientid" ON "extensions" USING btree ("element","folder","client_id");--> statement-breakpoint
CREATE INDEX "extensions_extension" ON "extensions" USING btree ("type","element","folder","client_id");--> statement-breakpoint
CREATE INDEX "fields_idx_checked_out" ON "fields" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "fields_idx_state" ON "fields" USING btree ("state");--> statement-breakpoint
CREATE INDEX "fields_idx_created_user_id" ON "fields" USING btree ("created_user_id");--> statement-breakpoint
CREATE INDEX "fields_idx_access" ON "fields" USING btree ("access");--> statement-breakpoint
CREATE INDEX "fields_idx_context" ON "fields" USING btree ("context");--> statement-breakpoint
CREATE INDEX "fields_idx_language" ON "fields" USING btree ("language");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_checked_out" ON "fields_groups" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_state" ON "fields_groups" USING btree ("state");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_created_by" ON "fields_groups" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_access" ON "fields_groups" USING btree ("access");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_context" ON "fields_groups" USING btree ("context");--> statement-breakpoint
CREATE INDEX "fields_groups_idx_language" ON "fields_groups" USING btree ("language");--> statement-breakpoint
CREATE INDEX "fields_values_idx_field_id" ON "fields_values" USING btree ("field_id");--> statement-breakpoint
CREATE INDEX "fields_values_idx_item_id" ON "fields_values" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "finder_links_idx_type" ON "finder_links" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "finder_links_idx_title" ON "finder_links" USING btree ("title");--> statement-breakpoint
CREATE INDEX "finder_links_idx_md5" ON "finder_links" USING btree ("md5sum");--> statement-breakpoint
CREATE INDEX "finder_links_idx_language" ON "finder_links" USING btree ("language");--> statement-breakpoint
CREATE INDEX "finder_links_idx_url" ON "finder_links" USING btree ("url");--> statement-breakpoint
CREATE INDEX "finder_links_idx_published_list" ON "finder_links" USING btree ("published","state","access","publish_start_date","publish_end_date","list_price");--> statement-breakpoint
CREATE INDEX "finder_links_idx_published_sale" ON "finder_links" USING btree ("published","state","access","publish_start_date","publish_end_date","sale_price");--> statement-breakpoint
CREATE INDEX "finder_links_terms_idx_term_weight" ON "finder_links_terms" USING btree ("term_id","weight");--> statement-breakpoint
CREATE INDEX "finder_links_terms_idx_link_term_weight" ON "finder_links_terms" USING btree ("link_id","term_id","weight");--> statement-breakpoint
CREATE INDEX "finder_logging_idx_searchterm" ON "finder_logging" USING btree ("searchterm");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_state" ON "finder_taxonomy" USING btree ("state");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_access" ON "finder_taxonomy" USING btree ("access");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_path" ON "finder_taxonomy" USING btree ("path");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_level" ON "finder_taxonomy" USING btree ("level");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_lft_rgt" ON "finder_taxonomy" USING btree ("lft","rgt");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_alias" ON "finder_taxonomy" USING btree ("alias");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_language" ON "finder_taxonomy" USING btree ("language");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_idx_parent_published" ON "finder_taxonomy" USING btree ("parent_id","state","access");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_map_link_id" ON "finder_taxonomy_map" USING btree ("link_id");--> statement-breakpoint
CREATE INDEX "finder_taxonomy_map_node_id" ON "finder_taxonomy_map" USING btree ("node_id");--> statement-breakpoint
CREATE UNIQUE INDEX "finder_terms_idx_term_language" ON "finder_terms" USING btree ("term","language");--> statement-breakpoint
CREATE INDEX "finder_terms_idx_term_phrase" ON "finder_terms" USING btree ("term","phrase");--> statement-breakpoint
CREATE INDEX "finder_terms_idx_stem_phrase" ON "finder_terms" USING btree ("stem","phrase");--> statement-breakpoint
CREATE INDEX "finder_terms_idx_soundex_phrase" ON "finder_terms" USING btree ("soundex","phrase");--> statement-breakpoint
CREATE INDEX "finder_terms_idx_language" ON "finder_terms" USING btree ("language");--> statement-breakpoint
CREATE UNIQUE INDEX "finder_terms_common_idx_term_language" ON "finder_terms_common" USING btree ("term","language");--> statement-breakpoint
CREATE INDEX "finder_terms_common_idx_lang" ON "finder_terms_common" USING btree ("language");--> statement-breakpoint
CREATE INDEX "finder_tokens_idx_word" ON "finder_tokens" USING btree ("term");--> statement-breakpoint
CREATE INDEX "finder_tokens_idx_stem" ON "finder_tokens" USING btree ("stem");--> statement-breakpoint
CREATE INDEX "finder_tokens_idx_context" ON "finder_tokens" USING btree ("context");--> statement-breakpoint
CREATE INDEX "finder_tokens_idx_language" ON "finder_tokens" USING btree ("language");--> statement-breakpoint
CREATE INDEX "finder_tokens_aggregate_token" ON "finder_tokens_aggregate" USING btree ("term");--> statement-breakpoint
CREATE INDEX "finder_tokens_aggregate_keyword_id" ON "finder_tokens_aggregate" USING btree ("term_id");--> statement-breakpoint
CREATE UNIQUE INDEX "finder_types_title" ON "finder_types" USING btree ("title");--> statement-breakpoint
CREATE INDEX "guidedtours_idx_access" ON "guidedtours" USING btree ("access");--> statement-breakpoint
CREATE INDEX "guidedtours_idx_state" ON "guidedtours" USING btree ("published");--> statement-breakpoint
CREATE INDEX "guidedtours_idx_language" ON "guidedtours" USING btree ("language");--> statement-breakpoint
CREATE INDEX "guidedtours_idx_uid" ON "guidedtours" USING btree ("uid");--> statement-breakpoint
CREATE INDEX "guidedtour_steps_idx_tour_id" ON "guidedtour_steps" USING btree ("tour_id");--> statement-breakpoint
CREATE INDEX "guidedtour_steps_idx_state" ON "guidedtour_steps" USING btree ("published");--> statement-breakpoint
CREATE INDEX "guidedtour_steps_idx_language" ON "guidedtour_steps" USING btree ("language");--> statement-breakpoint
CREATE INDEX "history_idx_ucm_item_id" ON "history" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "history_idx_save_date" ON "history" USING btree ("save_date");--> statement-breakpoint
CREATE UNIQUE INDEX "languages_idx_sef" ON "languages" USING btree ("sef");--> statement-breakpoint
CREATE UNIQUE INDEX "languages_idx_langcode" ON "languages" USING btree ("lang_code");--> statement-breakpoint
CREATE INDEX "languages_idx_ordering" ON "languages" USING btree ("ordering");--> statement-breakpoint
CREATE INDEX "languages_idx_access" ON "languages" USING btree ("access");--> statement-breakpoint
CREATE UNIQUE INDEX "mail_templates_idx_template_id_language" ON "mail_templates" USING btree ("template_id","language");--> statement-breakpoint
CREATE INDEX "mail_templates_idx_template_id" ON "mail_templates" USING btree ("template_id");--> statement-breakpoint
CREATE INDEX "mail_templates_idx_language" ON "mail_templates" USING btree ("language");--> statement-breakpoint
CREATE UNIQUE INDEX "menu_idx_client_id_parent_id_alias_language" ON "menu" USING btree ("client_id","parent_id","alias","language");--> statement-breakpoint
CREATE INDEX "menu_idx_componentid" ON "menu" USING btree ("component_id","menutype","published","access");--> statement-breakpoint
CREATE INDEX "menu_idx_menutype" ON "menu" USING btree ("menutype");--> statement-breakpoint
CREATE INDEX "menu_idx_left_right" ON "menu" USING btree ("lft","rgt");--> statement-breakpoint
CREATE INDEX "menu_idx_alias" ON "menu" USING btree ("alias");--> statement-breakpoint
CREATE INDEX "menu_idx_path" ON "menu" USING btree ("path");--> statement-breakpoint
CREATE INDEX "menu_idx_language" ON "menu" USING btree ("language");--> statement-breakpoint
CREATE UNIQUE INDEX "menu_types_idx_menutype" ON "menu_types" USING btree ("menutype");--> statement-breakpoint
CREATE INDEX "messages_useridto_state" ON "messages" USING btree ("user_id_to","state");--> statement-breakpoint
CREATE UNIQUE INDEX "messages_cfg_idx_user_var_name" ON "messages_cfg" USING btree ("user_id","cfg_name");--> statement-breakpoint
CREATE INDEX "modules_published" ON "modules" USING btree ("published","access");--> statement-breakpoint
CREATE INDEX "modules_newsfeeds" ON "modules" USING btree ("module","published");--> statement-breakpoint
CREATE INDEX "modules_idx_language" ON "modules" USING btree ("language");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_access" ON "newsfeeds" USING btree ("access");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_checkout" ON "newsfeeds" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_state" ON "newsfeeds" USING btree ("published");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_catid" ON "newsfeeds" USING btree ("catid");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_createdby" ON "newsfeeds" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "newsfeeds_idx_language" ON "newsfeeds" USING btree ("language");--> statement-breakpoint
CREATE INDEX "privacy_consents_idx_user_id" ON "privacy_consents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "redirect_links_idx_old_url" ON "redirect_links" USING btree ("old_url");--> statement-breakpoint
CREATE INDEX "redirect_links_idx_link_modified" ON "redirect_links" USING btree ("modified_date");--> statement-breakpoint
CREATE INDEX "scheduler_logs_idx_taskname" ON "scheduler_logs" USING btree ("taskname");--> statement-breakpoint
CREATE INDEX "scheduler_logs_idx_tasktype" ON "scheduler_logs" USING btree ("tasktype");--> statement-breakpoint
CREATE INDEX "scheduler_logs_idx_lastdate" ON "scheduler_logs" USING btree ("lastdate");--> statement-breakpoint
CREATE INDEX "scheduler_logs_idx_nextdate" ON "scheduler_logs" USING btree ("nextdate");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_type" ON "scheduler_tasks" USING btree ("type");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_state" ON "scheduler_tasks" USING btree ("state");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_last_exit" ON "scheduler_tasks" USING btree ("last_exit_code");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_next_exec" ON "scheduler_tasks" USING btree ("next_execution");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_locked" ON "scheduler_tasks" USING btree ("locked");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_priority" ON "scheduler_tasks" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_cli_exclusive" ON "scheduler_tasks" USING btree ("cli_exclusive");--> statement-breakpoint
CREATE INDEX "scheduler_tasks_idx_checked_out" ON "scheduler_tasks" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "session_userid" ON "session" USING btree ("userid");--> statement-breakpoint
CREATE INDEX "session_time" ON "session" USING btree ("time");--> statement-breakpoint
CREATE INDEX "session_idx_client_id_guest" ON "session" USING btree ("client_id","guest");--> statement-breakpoint
CREATE INDEX "tags_cat_idx" ON "tags" USING btree ("published","access");--> statement-breakpoint
CREATE INDEX "tags_idx_access" ON "tags" USING btree ("access");--> statement-breakpoint
CREATE INDEX "tags_idx_checkout" ON "tags" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "tags_idx_path" ON "tags" USING btree ("path");--> statement-breakpoint
CREATE INDEX "tags_idx_left_right" ON "tags" USING btree ("lft","rgt");--> statement-breakpoint
CREATE INDEX "tags_idx_alias" ON "tags" USING btree ("alias");--> statement-breakpoint
CREATE INDEX "tags_idx_language" ON "tags" USING btree ("language");--> statement-breakpoint
CREATE INDEX "template_overrides_idx_template" ON "template_overrides" USING btree ("template");--> statement-breakpoint
CREATE INDEX "template_overrides_idx_extension_id" ON "template_overrides" USING btree ("extension_id");--> statement-breakpoint
CREATE INDEX "template_styles_idx_template" ON "template_styles" USING btree ("template");--> statement-breakpoint
CREATE INDEX "template_styles_idx_client_id" ON "template_styles" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "template_styles_idx_client_id_home" ON "template_styles" USING btree ("client_id","home");--> statement-breakpoint
CREATE INDEX "ucm_base_ucm_item_id" ON "ucm_base" USING btree ("ucm_item_id");--> statement-breakpoint
CREATE INDEX "ucm_base_ucm_type_id" ON "ucm_base" USING btree ("ucm_type_id");--> statement-breakpoint
CREATE INDEX "ucm_base_ucm_language_id" ON "ucm_base" USING btree ("ucm_language_id");--> statement-breakpoint
CREATE INDEX "ucm_content_tag_idx" ON "ucm_content" USING btree ("core_state","core_access");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_access" ON "ucm_content" USING btree ("core_access");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_alias" ON "ucm_content" USING btree ("core_alias");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_language" ON "ucm_content" USING btree ("core_language");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_title" ON "ucm_content" USING btree ("core_title");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_modified_time" ON "ucm_content" USING btree ("core_modified_time");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_created_time" ON "ucm_content" USING btree ("core_created_time");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_content_type" ON "ucm_content" USING btree ("core_type_alias");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_core_modified_user_id" ON "ucm_content" USING btree ("core_modified_user_id");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_core_checked_out_user_id" ON "ucm_content" USING btree ("core_checked_out_user_id");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_core_created_user_id" ON "ucm_content" USING btree ("core_created_user_id");--> statement-breakpoint
CREATE INDEX "ucm_content_idx_core_type_id" ON "ucm_content" USING btree ("core_type_id");--> statement-breakpoint
CREATE UNIQUE INDEX "usergroups_idx_usergroup_parent_title_lookup" ON "usergroups" USING btree ("parent_id","title");--> statement-breakpoint
CREATE INDEX "usergroups_idx_usergroup_title_lookup" ON "usergroups" USING btree ("title");--> statement-breakpoint
CREATE INDEX "usergroups_idx_usergroup_adjacency_lookup" ON "usergroups" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "usergroups_idx_usergroup_nested_set_lookup" ON "usergroups" USING btree ("lft","rgt");--> statement-breakpoint
CREATE UNIQUE INDEX "user_keys_series" ON "user_keys" USING btree ("series");--> statement-breakpoint
CREATE INDEX "user_keys_idx_user_id" ON "user_keys" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_mfa_idx_user_id" ON "user_mfa" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_notes_idx_user_id" ON "user_notes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_notes_idx_category_id" ON "user_notes" USING btree ("catid");--> statement-breakpoint
CREATE UNIQUE INDEX "user_profiles_idx_user_id_profile_key" ON "user_profiles" USING btree ("user_id","profile_key");--> statement-breakpoint
CREATE UNIQUE INDEX "users_idx_username" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_idx_name" ON "users" USING btree ("name");--> statement-breakpoint
CREATE INDEX "users_idx_block" ON "users" USING btree ("block");--> statement-breakpoint
CREATE INDEX "users_email" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "viewlevels_idx_assetgroup_title_lookup" ON "viewlevels" USING btree ("title");--> statement-breakpoint
CREATE INDEX "webauthn_credentials_user_id" ON "webauthn_credentials" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "workflow_associations_idx_item_stage_extension" ON "workflow_associations" USING btree ("item_id","stage_id","extension");--> statement-breakpoint
CREATE INDEX "workflow_associations_idx_item_id" ON "workflow_associations" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "workflow_associations_idx_stage_id" ON "workflow_associations" USING btree ("stage_id");--> statement-breakpoint
CREATE INDEX "workflow_associations_idx_extension" ON "workflow_associations" USING btree ("extension");--> statement-breakpoint
CREATE INDEX "workflows_idx_asset_id" ON "workflows" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "workflows_idx_title" ON "workflows" USING btree ("title");--> statement-breakpoint
CREATE INDEX "workflows_idx_extension" ON "workflows" USING btree ("extension");--> statement-breakpoint
CREATE INDEX "workflows_idx_default" ON "workflows" USING btree ("default");--> statement-breakpoint
CREATE INDEX "workflows_idx_created" ON "workflows" USING btree ("created");--> statement-breakpoint
CREATE INDEX "workflows_idx_created_by" ON "workflows" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "workflows_idx_modified" ON "workflows" USING btree ("modified");--> statement-breakpoint
CREATE INDEX "workflows_idx_modified_by" ON "workflows" USING btree ("modified_by");--> statement-breakpoint
CREATE INDEX "workflows_idx_checked_out" ON "workflows" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "workflow_stages_idx_workflow_id" ON "workflow_stages" USING btree ("workflow_id");--> statement-breakpoint
CREATE INDEX "workflow_stages_idx_title" ON "workflow_stages" USING btree ("title");--> statement-breakpoint
CREATE INDEX "workflow_stages_idx_asset_id" ON "workflow_stages" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "workflow_stages_idx_default" ON "workflow_stages" USING btree ("default");--> statement-breakpoint
CREATE INDEX "workflow_stages_idx_checked_out" ON "workflow_stages" USING btree ("checked_out");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_title" ON "workflow_transitions" USING btree ("title");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_asset_id" ON "workflow_transitions" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_from_stage_id" ON "workflow_transitions" USING btree ("from_stage_id");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_to_stage_id" ON "workflow_transitions" USING btree ("to_stage_id");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_workflow_id" ON "workflow_transitions" USING btree ("workflow_id");--> statement-breakpoint
CREATE INDEX "workflow_transitions_idx_checked_out" ON "workflow_transitions" USING btree ("checked_out");