import { prismaClient } from "@repo/db/client";


export class CartNotFoundError extends Error {}


export async function getCartOrThrow(userId: string) {

  const cart = await prismaClient.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart;
}
