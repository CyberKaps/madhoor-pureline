import { prismaClient } from "@repo/db/client";


export class CartNotFoundError extends Error {
  constructor(message = "Cart not found") {
  super(message);
  this.name = "CartNotFoundError";
  }
}

// Fetch cart with items + products
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


// Fetch cart if exists, otherwise create it
export async function getOrCreateCart(userId: string) {

  let cart = await prismaClient.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prismaClient.cart.create({
      data: { userId },
    });
  }

  return cart;
  
}


// Fetch cart with items for display
export async function getCartWithItems(userId: string) {
  return prismaClient.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
