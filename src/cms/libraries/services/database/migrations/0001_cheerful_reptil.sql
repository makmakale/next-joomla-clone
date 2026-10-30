ALTER TABLE "extensions" ADD PRIMARY KEY ("extension_id");--> statement-breakpoint
ALTER TABLE "template_styles" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "template_styles" ALTER COLUMN "params" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "template_styles" ALTER COLUMN "params" SET DEFAULT '{}'::jsonb;