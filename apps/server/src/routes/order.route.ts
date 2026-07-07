import { Router } from "express";
import { protect } from "../middleware/auth";
import { getOrders, getOrderById, createOrder, cancelOrder } from "../controllers/order.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { createOrderSchema } from "../validators";

const orderRoutes: Router = Router();

orderRoutes.post("/", protect, validateRequest(createOrderSchema), createOrder);
orderRoutes.get("/", protect, getOrders);
orderRoutes.get("/:id", protect, getOrderById);
orderRoutes.post("/:id/cancel", protect, cancelOrder);

export default orderRoutes;
