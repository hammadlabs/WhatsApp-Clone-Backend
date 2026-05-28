/*
  Warnings:

  - You are about to drop the column `isRevoke` on the `UserRefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "UserRefreshToken" DROP COLUMN "isRevoke",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false;
