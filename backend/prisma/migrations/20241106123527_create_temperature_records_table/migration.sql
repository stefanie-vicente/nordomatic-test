-- CreateTable
CREATE TABLE "temperature_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "buildingId" INTEGER NOT NULL,
    "temperature" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    CONSTRAINT "temperature_records_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "buildings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
