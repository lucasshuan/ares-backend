/*
  Warnings:

  - You are about to drop the column `accountId` on the `Tourney` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tourney" DROP CONSTRAINT "Tourney_accountId_fkey";

-- AlterTable
ALTER TABLE "Tourney" DROP COLUMN "accountId";

-- AddForeignKey
ALTER TABLE "Tourney" ADD CONSTRAINT "Tourney_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
