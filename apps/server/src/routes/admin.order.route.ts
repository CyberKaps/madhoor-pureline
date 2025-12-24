
import { Router } from "express";
import { protect, isAdmin } from "../middleware/auth";
import { getAllOrders, updateOrderStatus } from "../controllers/admin.order.controller";

const adminOrderRoutes: Router = Router();

adminOrderRoutes.get("/orders", protect, isAdmin, getAllOrders);
adminOrderRoutes.patch("/orders/:id/status", protect, isAdmin, updateOrderStatus);

export default adminOrderRoutes;