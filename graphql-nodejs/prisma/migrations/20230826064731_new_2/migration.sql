/*
  Warnings:

  - You are about to drop the `UserModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserModel";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Todo" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Testing" (
    "Id" TEXT NOT NULL PRIMARY KEY
);
