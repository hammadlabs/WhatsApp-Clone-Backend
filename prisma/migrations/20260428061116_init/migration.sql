/*
  Warnings:

  - You are about to drop the column `country_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OtpVerification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_country_code_fkey";

-- DropIndex
DROP INDEX "User_phone_number_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country_code",
DROP COLUMN "discription",
DROP COLUMN "name",
DROP COLUMN "phone_number",
ADD COLUMN     "email" VARCHAR(15) NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "OtpVerification";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
