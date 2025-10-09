-- CreateTable
CREATE TABLE "IngredientList" (
    "id" SERIAL NOT NULL,
    "ingredients" TEXT NOT NULL,
    "recipes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngredientList_pkey" PRIMARY KEY ("id")
);
