-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_temperature_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buildingId" INTEGER NOT NULL,
    "temperature" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    CONSTRAINT "temperature_records_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_temperature_records" ("action", "buildingId", "createdAt", "id", "temperature") SELECT "action", "buildingId", "createdAt", "id", "temperature" FROM "temperature_records";
DROP TABLE "temperature_records";
ALTER TABLE "new_temperature_records" RENAME TO "temperature_records";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
