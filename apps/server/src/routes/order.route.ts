import { Router } from "express";
import { protect } from "../middleware/auth";
import { getOrders, getOrderById, createOrder, cancelOrder } from "../controllers/order.controller";

const orderRoutes: Router = Router();

orderRoutes.post("/", protect, createOrder);
orderRoutes.get("/", protect, getOrders);
orderRoutes.get("/:id", protect, getOrderById);
orderRoutes.post("/:id/cancel", protect, cancelOrder);

export default orderRoutes;
