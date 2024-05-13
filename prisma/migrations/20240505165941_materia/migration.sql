/*
  Warnings:

  - Added the required column `materia` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "materia" TEXT NOT NULL
);
INSERT INTO "new_Aluno" ("email", "id", "nome", "nota") SELECT "email", "id", "nome", "nota" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
