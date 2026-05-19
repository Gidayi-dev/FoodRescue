import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth.ts";

export const validateListing = (req: AuthRequest, res: Response, next: NextFunction) => {
    const { title, description, quantity, location } = req.body;

    if (!title || !description || !quantity || !location) {
        return res.status(400).json({
            success: false,
            error: "All fields are required",
        });
    }

    next(); // 
};