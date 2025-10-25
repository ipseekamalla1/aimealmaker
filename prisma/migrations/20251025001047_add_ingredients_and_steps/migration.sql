/*
  Warnings:

  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "ingredients" TEXT,
ADD COLUMN     "steps" TEXT;
