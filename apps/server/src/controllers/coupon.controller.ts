import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { Prisma } from "@repo/db/client";

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await prismaClient.coupon.findMany();
    return res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching coupons" });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, discountPercentage, maxDiscountAmount, minOrderAmount, validUntil } = req.body;
    const coupon = await prismaClient.coupon.create({
      data: {
        code,
        discountPercentage,
        maxDiscountAmount,
        minOrderAmount,
        validUntil: validUntil ? new Date(validUntil) : null,
      },
    });
    return res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return res.status(400).json({ success: false, message: "Coupon code already exists" });
    }
    return res.status(500).json({ success: false, message: "Error creating coupon" });
  }
};

export const toggleCouponStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const coupon = await prismaClient.coupon.update({
      where: { id },
      data: { isActive },
    });
    return res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error updating coupon" });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaClient.coupon.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting coupon" });
  }
};
