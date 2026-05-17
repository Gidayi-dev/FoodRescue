import { Router } from "express";
import { loginUser } from "../controllers/authControllers.ts";
import { authenticate } from "../middleware/auth.ts";
import { getProfile } from "../controllers/authProfile.ts";
import { registerUser } from "../controllers/userControllers.ts";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser)
router.get("/profile", authenticate, getProfile)

export default router