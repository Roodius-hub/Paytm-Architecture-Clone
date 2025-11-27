-- CreateEnum
CREATE TYPE "Auth" AS ENUM ('Google', 'Github');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "age" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
