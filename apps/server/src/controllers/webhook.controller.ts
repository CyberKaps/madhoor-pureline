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

    // Log webhook
    await prismaClient.webhookLog.create({
      data: {
        event: event.event,
        payload: event,
      },
    });

    // Handle successful payment
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await prismaClient.order.findFirst({
        where: {
          razorpayOrderId: payment.order_id,
        },
      });

      // Idempotency check
      if (!order || order.status !== "PENDING") {
        return res.status(200).json({ ignored: true });
      }

      await prismaClient.order.update({
        where: {
          id: order.id
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
