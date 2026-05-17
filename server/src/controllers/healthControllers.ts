import type { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API is healthy",
    uptime: process.uptime(),
  });
};

export const rootHandler = (_req: Request, res: Response) => {
  res.send("Busia Food Rescue API running");
};