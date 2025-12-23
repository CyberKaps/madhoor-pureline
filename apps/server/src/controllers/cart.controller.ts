import { Request, Response } from 'express';
import { prismaClient } from "@repo/db/client";
import { CartNotFoundError, getCartOrThrow, getCartWithItems, getOrCreateCart } from '../services/cart.service';
import { Prisma } from "@prisma/client"

export const getCart = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;
        

        const cart = getCartWithItems(userId);

        if(!cart) {
            return res.status(200).json({
                success: true,
                cart: null,
                message: "Cart is empty",
            });
        }

        res.json({ 
            success: true, 
            cart 
        });

    } catch(e) {
        console.error(e)
        return res.status(500).json({
            success: false,
            message: "Error",
            Error: e
        })
    }
}


export const addToCart = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;

        const { productId, quantity = 1} = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or quantity",
            });
         }

        // Ensure cart exists
        const cart = await getOrCreateCart(userId);


        // Add or update the product in the cart using UPSERT
        // The composite unique constraint (productId + cartId) ensures that a product can appear only once per cart
        const item = await prismaClient.cartItem.upsert({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id,
            },
            },
            update: {
                quantity: { increment: quantity },
            },
            create: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });


        res.status(201).json({
            success: true,
            item
        })


    } catch(e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            error: typeof e === "object" && e !== null && "message" in e ? (e as any).message : String(e)
        })
    }
}

export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { productId, quantity } = req.body;

        if (!productId || typeof quantity !== "number" || quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or quantity",
            });
        }


        const cart = await getCartOrThrow(userId);

        const cartId = cart.id;

        // If quantity is 0 → remove item from cart
        if(quantity === 0) {
            await prismaClient.cartItem.delete({
                where: {
                    productId_cartId: {
                        productId,
                        cartId
                    }
                }
            });

            return res.status(200).json({
                success: true,
                message: "Item removed from cart",
            });
        }
        


        // update quantity
        const item = await prismaClient.cartItem.update({
            where: {
                productId_cartId: {
                    productId,
                    cartId
                },
            },
            data: {
                quantity
            }
        });

        return res.status(200).json({
            success: true,
            item,
        });


    } catch(e) {
        console.error(e)
        if( e instanceof CartNotFoundError) {
            return res.status(404).json({
            success: false,
            message: e.message,
        });
        }

        if( e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025"){
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        return res.status(500).json({
            success: false,
            error:
                typeof e === "object" && e !== null && "message" in e
                ? (e as any).message
                : String(e),
        });
    }
}


export const removeFromCart = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;

        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }


        // Get cart or throw if not found
        const cart = await getCartOrThrow(userId);

        // Delete the cart item using composite unique key
        await prismaClient.cartItem.delete({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });

    } catch(e) {
        console.error(e);

        // Cart not found
        if (e instanceof CartNotFoundError) {
            return res.status(404).json({
                success: false,
                message: e.message,
            });
        }

         // Item not found in cart
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart",
            });
        }

        return res.status(500).json({
            success: false,
            error:
                typeof e === "object" && e !== null && "message" in e
                ? (e as any).message
                : String(e),
        });
    }
}


export const clearCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const cart = await prismaClient.cart.findUnique({
            where: {
                userId
            }
        });

        if(!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is already empty"
            });
        }

        
        // Delete all items belonging to this cart
        await prismaClient.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });

    } catch(e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            error:
                typeof e === "object" && e !== null && "message" in e
                ? (e as any).message
                : String(e),
        });
    }
}



