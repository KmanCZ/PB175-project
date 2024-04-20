/*
  Warnings:

  - Added the required column `organization` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "organization" TEXT NOT NULL;
