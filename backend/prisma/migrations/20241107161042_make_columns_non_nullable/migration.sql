/*
  Warnings:

  - Made the column `current_temperature` on table `buildings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperature_scale` on table `buildings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `buildings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `building_id` on table `temperature_records` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_buildings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "current_temperature" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "temperature_scale" TEXT NOT NULL
);
INSERT INTO "new_buildings" ("address", "created_at", "current_temperature", "id", "name", "temperature_scale", "updated_at") SELECT "address", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "current_temperature", "id", "name", "temperature_scale", "updated_at" FROM "buildings";
DROP TABLE "buildings";
ALTER TABLE "new_buildings" RENAME TO "buildings";
CREATE TABLE "new_temperature_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "building_id" INTEGER NOT NULL,
    "temperature" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    CONSTRAINT "temperature_records_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_temperature_records" ("action", "building_id", "created_at", "id", "temperature") SELECT "action", "building_id", coalesce("created_at", CURRENT_TIMESTAMP) AS "created_at", "id", "temperature" FROM "temperature_records";
DROP TABLE "temperature_records";
ALTER TABLE "new_temperature_records" RENAME TO "temperature_records";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
