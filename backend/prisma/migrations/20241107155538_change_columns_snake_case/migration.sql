/*
  Warnings:

  - You are about to drop the column `createdAt` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `currentTemperature` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureScale` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `buildings` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `temperature_records` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `temperature_records` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buildings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "current_temperature" REAL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "temperature_scale" TEXT
);
INSERT INTO "new_buildings" ("address", "id", "name") SELECT "address", "id", "name" FROM "buildings";
DROP TABLE "buildings";
ALTER TABLE "new_buildings" RENAME TO "buildings";
CREATE TABLE "new_temperature_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "building_id" INTEGER,
    "temperature" REAL NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    CONSTRAINT "temperature_records_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_temperature_records" ("action", "id", "temperature") SELECT "action", "id", "temperature" FROM "temperature_records";
DROP TABLE "temperature_records";
ALTER TABLE "new_temperature_records" RENAME TO "temperature_records";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
