/*
  Warnings:

  - Added the required column `chat_text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "chat_text" TEXT NOT NULL;
