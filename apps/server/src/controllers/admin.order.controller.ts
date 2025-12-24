import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { OrderStatus } from "@prisma/client";


export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prismaClient.order.findMany({
            orderBy: { createdAt: 'desc'},
            include: {
                user: {
                    select: { id: true, name: true, email: true},
                },
                items: {
                    include: {
                        product: true
                    }
                },
                shippingAddress: true
            }
        });

        return res.status(200).json({
            success: true,
            data: orders
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
}


export const updateOrderStatus = async (req: Request, res: Response) => {
    try{

        const { id } = req.params;
        const { status } = req.body as { status: OrderStatus };

        if(!Object.values(OrderStatus).includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order Status"
            })
        }

        const order = await prismaClient.order.findUnique({
            where: { id },
        });

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not Found"
            })
        }

        if (order.status === "DELIVERED" || order.status === "CANCELLED") {
            return res.status(400).json({
                success: false,
                message: `Cannot update order after ${order.status}`,
            });
        }


        // Invalid transitions
        const invalidTransitions: Record<OrderStatus, OrderStatus[]> = {
            PENDING: ["DELIVERED"],
            PAID: ["PENDING"],
            SHIPPED: ["PENDING", "PAID"],
            DELIVERED: [],
            CANCELLED: [],
        };


        if (invalidTransitions[order.status]?.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status transition from ${order.status} to ${status}`,
            });
        }
        
        const updatedOrder = await prismaClient.order.update({
            where: { id },
            data: { status },
        });

        return res.status(200).json({
            success: true,
            data: updatedOrder,
        });


    } catch(e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
        });
    }
}