set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Recipes" (
	"recipeId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"image" TEXT NOT NULL,
  "ingredients" TEXT NOT NULL,
	"calories" integer NOT NULL,
	"servingSize" integer NOT NULL,
	"recipeLink" TEXT NOT NULL,
	"cuisineType" TEXT,
	"mealType" TEXT,
	"dishType" TEXT,
  "uri" TEXT NOT NULL UNIQUE,
	CONSTRAINT "Recipes_pk" PRIMARY KEY ("recipeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Favorites" (
	"recipeId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk0" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("recipeId");
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
