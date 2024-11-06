/*
  Warnings:

  - You are about to drop the column `currentTemp` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `tempetaratureScale` on the `buildings` table. All the data in the column will be lost.
  - Added the required column `temperatureScale` to the `buildings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buildings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "currentTemperature" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "temperatureScale" TEXT NOT NULL
);
INSERT INTO "new_buildings" ("address", "createdAt", "currentTemperature", "id", "name", "updatedAt") SELECT "address", "createdAt", "currentTemperature", "id", "name", "updatedAt" FROM "buildings";
DROP TABLE "buildings";
ALTER TABLE "new_buildings" RENAME TO "buildings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
