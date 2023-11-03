/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nomination` on the `Nomination` table. All the data in the column will be lost.
  - Added the required column `name` to the `Nomination` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Contestant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "nominationId" INTEGER NOT NULL,
    CONSTRAINT "Contestant_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "Nomination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Nomination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Nomination" ("id") SELECT "id" FROM "Nomination";
DROP TABLE "Nomination";
ALTER TABLE "new_Nomination" RENAME TO "Nomination";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
