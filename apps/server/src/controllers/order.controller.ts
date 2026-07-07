import { Request, Response } from "express"
import { CartNotFoundError, getCartOrThrow } from "../services/cart.service";
import { prismaClient } from "@repo/db/client";



export const createOrder = async (req: Request, res:Response) => {
    try {
        const userId = req.user.id;
        const { street, city, pincode, paymentMode = "COD", couponCode, items } = req.body

        if (!street || !city || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Complete shipping address is required",
            });
        }

        if (!Number.isInteger(pincode)) {
            return res.status(400).json({ message: "Invalid pincode" });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // Fetch products from DB to validate prices and stock
        const productIds = items.map((item: any) => item.productId);
        const products = await prismaClient.product.findMany({
            where: { id: { in: productIds } }
        });

        const productMap = new Map(products.map(p => [p.id, p]));

        // check stock availability and construct verified items array
        const verifiedItems: any[] = [];
        for (const item of items) {
            const product = productMap.get(item.productId);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found.`,
                });
            }
            if (item.quantity > product.stockQuantity) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${product.name} is out of stock or requested quantity exceeds available stock.`,
                });
            }
            verifiedItems.push({
                productId: product.id,
                price: product.price,
                quantity: item.quantity,
                name: product.name
            });
        }

        // calculate total
        let subTotalAmount = verifiedItems.reduce( (sum: number, item: any) => sum + item.price * item.quantity, 0 )
        let discountAmount = 0;
        let couponId = null;

        if (couponCode) {
            const coupon = await prismaClient.coupon.findUnique({ where: { code: couponCode } });
            if (!coupon || !coupon.isActive || (coupon.validUntil && coupon.validUntil < new Date())) {
                return res.status(400).json({ success: false, message: "Invalid or expired coupon" });
            }
            if (coupon.minOrderAmount && subTotalAmount < coupon.minOrderAmount) {
                return res.status(400).json({ success: false, message: `Minimum order amount for this coupon is ${coupon.minOrderAmount}` });
            }
            
            discountAmount = (subTotalAmount * coupon.discountPercentage) / 100;
            if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
                discountAmount = coupon.maxDiscountAmount;
            }
            couponId = coupon.id;
        }

        const shippingAmount = subTotalAmount > 500 ? 0 : 50; // free shipping above 500
        const totalAmount = subTotalAmount - discountAmount + shippingAmount;

        const order = await prismaClient.$transaction(async (tx: any) => {
            // create shipping address
            const address = await tx.address.create({
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
                    subTotalAmount,
                    discountAmount,
                    shippingAmount,
                    totalAmount,
                    paymentMode,
                    status: "PENDING",
                    shippingAddressId: address.id,
                    ...(couponId ? { couponId } : {})
                }
            });

            // update stock and create order item
            for (const item of verifiedItems) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stockQuantity: { decrement: item.quantity } }
                });
            }

            await tx.orderItem.createMany({
                data: verifiedItems.map((item: any) => ({
                    orderId: newOrder.id,
                    productId: item.productId,
                    price: item.price,
                    quantity: item.quantity
                })),
            });

            // clear cart if it exists (ignoring errors if not)
            try {
                const cart = await tx.cart.findUnique({ where: { userId } });
                if (cart) {
                    await tx.cartItem.deleteMany({
                        where: { cartId: cart.id}
                    });
                }
            } catch(e) {
                // Ignore missing cart
            }

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


export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const order = await prismaClient.order.findFirst({
             where: { id, userId },
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.status !== "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Only pending orders can be cancelled",
            });
        }

        await prismaClient.order.update({
            where: { id },
            data: { status: "CANCELLED" },
        });

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Failed to cancel order",
        });
    }
};