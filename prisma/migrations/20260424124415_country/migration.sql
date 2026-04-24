/*
  Warnings:

  - You are about to drop the column `country_code` on the `User` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_country_code_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country_code",
ADD COLUMN     "countryId" TEXT NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(15);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("country_code") ON DELETE RESTRICT ON UPDATE CASCADE;
