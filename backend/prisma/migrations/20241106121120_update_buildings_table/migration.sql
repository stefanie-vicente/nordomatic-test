/*
  Warnings:

  - You are about to drop the `building` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "building";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "buildings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "currentTemp" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tempetaratureScale" TEXT NOT NULL,
    "currentTemperature" REAL NOT NULL
);
