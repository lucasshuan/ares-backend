/*
  Warnings:

  - You are about to drop the column `description` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `TourneySchedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `score` to the `MatchTeam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tourneyScheduleId_fkey";

-- AlterTable
ALTER TABLE "Clan" ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "tourneyScheduleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MatchTeam" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "description",
ADD COLUMN     "biography" TEXT;

-- AlterTable
ALTER TABLE "TourneySchedule" DROP COLUMN "matchId",
ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "Player"("username");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tourneyScheduleId_fkey" FOREIGN KEY ("tourneyScheduleId") REFERENCES "TourneySchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
