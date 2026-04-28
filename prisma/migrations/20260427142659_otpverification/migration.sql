/*
  Warnings:

  - The primary key for the `OtpVerification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OtpVerification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OtpVerification" DROP CONSTRAINT "OtpVerification_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OtpVerification_pkey" PRIMARY KEY ("phone_number");
