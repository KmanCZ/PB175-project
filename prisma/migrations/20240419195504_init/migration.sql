-- CreateEnum
CREATE TYPE "role" AS ENUM ('manager', 'employee');

-- CreateTable
CREATE TABLE "user_profile" (
    "user_id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_role" "role" NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id")
);
