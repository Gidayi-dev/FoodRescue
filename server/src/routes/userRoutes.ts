import { Router } from "express";
import { registerUser } from "../controllers/userControllers.ts";

const router = Router();

router.post("/", registerUser);

export default router;