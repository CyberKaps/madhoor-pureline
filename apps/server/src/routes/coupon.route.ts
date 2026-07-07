import { Router } from "express";
import { protect, isAdmin } from "../middleware/auth";
import { validateRequest } from "../middleware/validate.middleware";
import { createCouponSchema } from "../validators";
import { createCoupon, deleteCoupon, getCoupons, toggleCouponStatus } from "../controllers/coupon.controller";

const couponRoutes: Router = Router();

// Only admins can manage coupons
couponRoutes.use(protect, isAdmin);

couponRoutes.get("/", getCoupons);
couponRoutes.post("/", validateRequest(createCouponSchema), createCoupon);
couponRoutes.patch("/:id/status", toggleCouponStatus);
couponRoutes.delete("/:id", deleteCoupon);

export default couponRoutes;
