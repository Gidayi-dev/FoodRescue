import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      return authHeader.slice(7).trim() || null;
    }
    return authHeader.trim() || null;
  }

  const cookieToken = req.cookies?.token;
  if (typeof cookieToken === "string" && cookieToken) {
    return cookieToken;
  }

  const headerToken = req.headers["x-access-token"];
  if (typeof headerToken === "string" && headerToken) {
    return headerToken;
  }

  return null;
};

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        error:
          "Authentication required. Log in first, or send Authorization: Bearer <token> from the login response.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};
