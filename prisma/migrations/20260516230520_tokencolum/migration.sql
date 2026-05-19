/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserRefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `UserRefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRefreshToken" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRefreshToken_token_key" ON "UserRefreshToken"("token");
