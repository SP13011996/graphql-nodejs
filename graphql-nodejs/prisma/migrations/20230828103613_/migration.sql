-- CreateTable
CREATE TABLE "Test1" (
    "Id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Test2" (
    "Id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_Test1ToTest2" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Test1ToTest2_A_fkey" FOREIGN KEY ("A") REFERENCES "Test1" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Test1ToTest2_B_fkey" FOREIGN KEY ("B") REFERENCES "Test2" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Test1ToTest2_AB_unique" ON "_Test1ToTest2"("A", "B");

-- CreateIndex
CREATE INDEX "_Test1ToTest2_B_index" ON "_Test1ToTest2"("B");
