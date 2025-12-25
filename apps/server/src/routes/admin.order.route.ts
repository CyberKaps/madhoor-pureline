
import { Router } from "express";
import { protect, isAdmin } from "../middleware/auth";
import { adminAnalytics, getAllOrders, updateOrderStatus } from "../controllers/admin.controller";

const adminRoutes: Router = Router();

adminRoutes.get("/orders", protect, isAdmin, getAllOrders);
adminRoutes.patch("/orders/:id/status", protect, isAdmin, updateOrderStatus);
adminRoutes.get("/analytics", protect, isAdmin, adminAnalytics);

export default adminRoutes;