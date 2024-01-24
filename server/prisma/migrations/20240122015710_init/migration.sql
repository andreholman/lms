-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BOOK', 'MOVIE');

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "ISBN" INTEGER,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "total_copies" INTEGER NOT NULL,
    "available_copies" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "outstanding_fines" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowed" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Borrowed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_address_key" ON "Branch"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_contact_number_key" ON "Branch"("contact_number");

-- CreateIndex
CREATE UNIQUE INDEX "Item_ISBN_key" ON "Item"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "Member_contact_number_key" ON "Member"("contact_number");

-- AddForeignKey
ALTER TABLE "Borrowed" ADD CONSTRAINT "Borrowed_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowed" ADD CONSTRAINT "Borrowed_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
