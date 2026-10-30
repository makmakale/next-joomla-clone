CREATE TABLE "extensions" (
	"extension_id" serial NOT NULL,
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
	"note" varchar(255),
	CONSTRAINT "extensions_pkey" PRIMARY KEY("extension_id")
);
--> statement-breakpoint
CREATE TABLE "template_styles" (
	"id" serial NOT NULL,
	"template" varchar(50) DEFAULT '' NOT NULL,
	"client_id" smallint DEFAULT 0 NOT NULL,
	"home" varchar(7) DEFAULT '0' NOT NULL,
	"title" varchar(255) DEFAULT '' NOT NULL,
	"inheritable" smallint DEFAULT 0 NOT NULL,
	"parent" varchar(50) DEFAULT '',
	"params" text NOT NULL,
	CONSTRAINT "template_styles_pkey" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE INDEX "extensions_element_clientid" ON "extensions" USING btree ("element","client_id");--> statement-breakpoint
CREATE INDEX "extensions_element_folder_clientid" ON "extensions" USING btree ("element","folder","client_id");--> statement-breakpoint
CREATE INDEX "extensions_extension" ON "extensions" USING btree ("type","element","folder","client_id");--> statement-breakpoint
CREATE INDEX "template_styles_idx_template" ON "template_styles" USING btree ("template");--> statement-breakpoint
CREATE INDEX "template_styles_idx_client_id" ON "template_styles" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "template_styles_idx_client_id_home" ON "template_styles" USING btree ("client_id","home");