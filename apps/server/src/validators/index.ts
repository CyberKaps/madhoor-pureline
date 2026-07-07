import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    imageUrl: z.string().url("Invalid URL").optional(),
    stockQuantity: z.number().int().min(0).optional(),
    categoryId: z.string().cuid("Invalid category ID").optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    imageUrl: z.string().url().optional(),
    stockQuantity: z.number().int().min(0).optional(),
    categoryId: z.string().cuid().optional(),
  }),
  params: z.object({
    id: z.string().cuid("Invalid product ID"),
  }),
});

export const createOrderSchema = z.object({
  body: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.number().int().positive("Invalid pincode"),
    paymentMode: z.enum(["COD", "ONLINE"]).optional(),
    couponCode: z.string().optional(),
  }),
});
