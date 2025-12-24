/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `razorpayOrderId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "razorpayOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_razorpayOrderId_key" ON "orders"("razorpayOrderId");
