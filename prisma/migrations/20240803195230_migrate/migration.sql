/*
  Warnings:

  - You are about to drop the column `state` on the `Adress` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Adress_state_key";

-- AlterTable
ALTER TABLE "Adress" DROP COLUMN "state";
