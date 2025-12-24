import { Router } from "express";
import { protect } from "../middleware/auth";
import { createRazorpayOrder, verifyPayment } from "../controllers/payment.controller";


const paymentRoutes: Router = Router();

paymentRoutes.post("/razorpay/order", protect, createRazorpayOrder );
paymentRoutes.post("/razorpay/verify", protect, verifyPayment);


export default paymentRoutes;
