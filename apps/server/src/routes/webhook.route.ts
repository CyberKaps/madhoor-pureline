import express, { Router } from "express";
import { razorpayWebhook } from "../controllers/webhook.controller";

const webhookRoutes: Router = Router();


webhookRoutes.post( "/razorpay", express.raw({ type: "application/json" }), razorpayWebhook);

export default webhookRoutes;