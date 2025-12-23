import { prismaClient } from "@repo/db/client";


export class CartNotFoundError extends Error {}


export async function getCartOrThrow(userId: string) {

  const cart = await prismaClient.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        },
      },
    },
  });

  if (!cart) {
    throw new CartNotFoundError("Cart not found");
  }

  return cart;
}
