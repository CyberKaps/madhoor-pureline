/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `orders` table. All the data in the column will be lost.
  - Added the required column `shippingAddressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shippingAddress",
ADD COLUMN     "shippingAddressId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "shippingAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "shippingAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "shippingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
