import type { Response } from "express";
import { prisma } from "../config/prisma.ts";
import type { AuthRequest } from "../middleware/auth.ts";

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            })
        }

        const { password, ...safeUser } = user

        res.json({
            success: true,
            user: safeUser,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch profile",
        })
    }
}