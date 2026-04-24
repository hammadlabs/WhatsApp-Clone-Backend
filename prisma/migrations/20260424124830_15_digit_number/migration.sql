/*
  Warnings:

  - You are about to drop the column `countryId` on the `User` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "countryId",
ADD COLUMN     "country_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "Country"("country_code") ON DELETE RESTRICT ON UPDATE CASCADE;
