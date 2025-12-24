import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";
import { razorpay } from "../utils/razorpay";
import crypto from "crypto"


export const createRazorpayOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { orderId } = req.body;
        
        if(!orderId){
            return res.status(400).json({
                message: "OrderId is Required "
            });
        }

        const order = await prismaClient.order.findFirst({
            where: {id: orderId, userId},
        });

        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        if(order.paymentMode !== "ONLINE") {
            return res.status(400).json({
                message: "Order is not ONLINE Payment"
            })
        }

        if(order.status !== "PENDING") {
            return res.status(400).json({
                message: "Order already Processed"
            })
        };

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(order.totalAmount * 100), //INR -> Paise
            currency: "INR",
            receipt: order.id,
        });

        return res.status(200).json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Failed to create Razorpay Order"
        })
    }
}

export const verifyPayment = async (req: Request, res: Response) => {
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId,
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !orderId
        ) {
            return res.status(400).json({ message: "Missing payment details" });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }


        const order = await prismaClient.order.findFirst({
            where: {
                id: orderId,
                userId: req.user.id,
                status: "PENDING"
            }
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found or already processed",
            });
        }


        await prismaClient.order.update({
            where: { id: orderId },
            data: {
                status: "PAID",
                paymentId: razorpay_payment_id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Payment verified, order marked as PAID",
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
        });
    }
}