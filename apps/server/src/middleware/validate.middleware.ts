import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: (e as any).errors,
        });
      }
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
};
