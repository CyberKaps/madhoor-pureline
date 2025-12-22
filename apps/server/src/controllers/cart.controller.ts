import { Request, Response } from 'express';
import { prisma } from "@repo/db/client";


export const getCart = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;

        const cart = await prisma.cart.findUnique({
            where: {userId},
            include: {
                items: {
                    include: {
                        product: true
                    },
                },
            },
        });

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
        console.log(e)
        res.status(500).json({
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
        let cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if(!cart) {
            cart = await prisma.cart.create({
            data: { userId },
        });
        }


        // Add or update the product in the cart using UPSERT
        // The composite unique constraint (productId + cartId) ensures that a product can appear only once per cart
        const item = await prisma.cartItem.upsert({
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


        res.status(200).json({
            success: true,
            item
        })


    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: typeof e === "object" && e !== null && "message" in e ? (e as any).message : String(e)
        })
    }
}