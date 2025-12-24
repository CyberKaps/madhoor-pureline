import { Request, Response } from "express"
import { CartNotFoundError, getCartOrThrow } from "../services/cart.service";
import { prismaClient } from "@repo/db/client";



export const createOrder = async (req: Request, res:Response) => {
    try {
        const userId = req.user.id;
        const { street, city, pincode, paymentMode = "COD" } = req.body


        if (!street || !city || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Complete shipping address is required",
            });
        }

        if (!Number.isInteger(pincode)) {
            return res.status(400).json({ message: "Invalid pincode" });
        }

        const cart = await getCartOrThrow(userId);

        if (cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // calculate total
        const totalAmount = cart.items.reduce( (sum, item) => sum + item.product.price * item.quantity, 0 )

        const order = await prismaClient.$transaction(async (tx) => {
            // create shipping address
            const address = await tx.shippingAddress.create({
                data: {
                    street,
                    city,
                    pincode
                }
            });

            // create order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    paymentMode,
                    status: "PENDING",
                    shippingAddressId: address.id
                }
            });

            // create order item
            await tx.orderItem.createMany({
                data: cart.items.map((item) => ({
                    orderId: newOrder.id,
                    productId: item.productId,
                    price: item.product.price,
                    quantity: item.quantity
                })),
            });

            // clear cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id}
            })

            return newOrder;
        })

        return res.status(201).json({
            success: true,
            orderId: order.id,
            message: "Order placed successfully",
        });

    } catch(e) {
        console.log(e)
        
        if( e instanceof CartNotFoundError ) {
            return res.status(404).json({
                success: false,
                message: e.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create order"
        });
    }
}


export const getOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        
        const orders = await prismaClient.order.findMany({
            where: { userId },
            orderBy: { createdAt: "desc"},
            include: {
                items: {
                    include: {
                        product: true
                    },
                },
                shippingAddress: true
            }
        });

        return res.status(200).json({
            success: true,
            data: orders,
        });

    } catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
}


export const getOrderById = async (req: Request, res: Response) => {
    try {
        const userId =  req.user.id;   
        const { id } = req.params;

        const order = await prismaClient.order.findFirst({
            where: {
                id,
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },

                shippingAddress: true
            }
        });

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        })

        
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order"
        });
    }
}
