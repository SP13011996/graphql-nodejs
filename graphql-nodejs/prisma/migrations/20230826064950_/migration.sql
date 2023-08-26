/*
  Warnings:

  - You are about to drop the `UserNew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserNew";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("Description", "Id", "userId") SELECT "Description", "Id", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
