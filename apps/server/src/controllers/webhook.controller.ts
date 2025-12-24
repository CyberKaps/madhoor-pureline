import crypto from "crypto";
import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";

export const razorpayWebhook = async (req: Request, res: Response) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const signature = req.headers["x-razorpay-signature"] as string;

    // Verify signature using raw body
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body) // raw body buffer
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    // Parse webhook payload
    const event = JSON.parse(req.body.toString());

    // Handle successful payment
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await prismaClient.order.updateMany({
        where: {
          razorpayOrderId: payment.order_id,
          status: "PENDING",
        },
        data: {
          status: "PAID",
          paymentId: payment.id,
        },
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};
