/*
  Warnings:

  - A unique constraint covering the columns `[stackAuthId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "company" TEXT,
ADD COLUMN     "stackAuthId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stackAuthId_key" ON "public"."User"("stackAuthId");
