CREATE TABLE "cms_config" (
	"key" varchar(100) PRIMARY KEY NOT NULL,
	"params" jsonb DEFAULT '{}'::jsonb NOT NULL
);
