/*
  Warnings:

  - A unique constraint covering the columns `[productId,cartId]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "order_items" ALTER COLUMN "quantity" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_productId_cartId_key" ON "cart_items"("productId", "cartId");

-- CreateIndex
CREATE INDEX "carts_userId_idx" ON "carts"("userId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");
