import type { Request, Response } from "express";
import { prisma } from "../config/prisma.ts";
import type { AuthRequest } from "../middleware/auth.ts";
import { error } from "node:console";

export const createListing = async (req: AuthRequest, res: Response) => {

  try {

    const { title, description, quantity, location } = req.body;
    const listing = await prisma.foodListing.create({
      data: {
        title,
        description,
        quantity,
        location,
        userId: req.user!.id,
      },
    });

    return res.status(201).json({
      success: true,
      listing,

    });

  } catch (err) {
    console.error("Listing creation error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to create listing",

    });

  }

};

export const getListing = async (req: Request, res: Response) => {
    const { title, description, quantity, location } = req.body;
    try {
        const listings = await prisma.foodListing.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json({
            success: true,
            listings,
        });
    } catch (err) {
        console.error("Fetch listings error:", err)

        res.status(500).json({
            success: false,
            error: "Failed to fetch listings",
        })
    }
}