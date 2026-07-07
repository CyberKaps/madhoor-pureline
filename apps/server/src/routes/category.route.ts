import { Router } from "express";
import { protect, isAdmin } from "../middleware/auth";
import { validateRequest } from "../middleware/validate.middleware";
import { createCategorySchema } from "../validators";
import { createCategory, deleteCategory, getCategories } from "../controllers/category.controller";

const categoryRoutes: Router = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", protect, isAdmin, validateRequest(createCategorySchema), createCategory);
categoryRoutes.delete("/:id", protect, isAdmin, deleteCategory);

export default categoryRoutes;
