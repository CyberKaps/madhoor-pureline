import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { Prisma } from "@repo/db/client";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prismaClient.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error fetching categories" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await prismaClient.category.create({
      data: { name, description },
    });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        return res.status(400).json({ success: false, message: "Category name already exists" });
    }
    return res.status(500).json({ success: false, message: "Error creating category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaClient.category.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error deleting category" });
  }
};
