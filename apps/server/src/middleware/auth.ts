import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../lib/redisClient";

export interface CustomUserPayload { 
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //  Get token (cookie first, then Bearer)
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    // Check Redis blacklist (logout support)
    const isBlacklisted = await redisClient.get(
      `blacklist:${token}`
    );

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Verify JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not set");
    }

    const decoded = jwt.verify(token, secret) as CustomUserPayload;

    // Attach user to request
    req.user = decoded;

    next();

  } catch (e) {
    console.error(e);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Admin access required",
    });
  }
  next();
};
