import { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import { Prisma } from "@prisma/client";


// public controllers
// Supports pagination + search
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaClient.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};


export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};



// admin controllers
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and price are required",
      });
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price",
      });
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        imageUrl,
      },
    });

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;

    const updateData: Prisma.ProductUpdateInput = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid price",
        });
      }
      updateData.price = parsedPrice;
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prismaClient.product.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error deleting product",
    });
  }
};
