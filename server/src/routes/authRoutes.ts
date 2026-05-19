import { Router } from "express";
import { loginUser } from "../controllers/authControllers.ts";
import { authenticate } from "../middleware/auth.ts";
import { getProfile } from "../controllers/authProfile.ts";
import { registerUser } from "../controllers/userControllers.ts";
import { validateListing } from "../middleware/validateListing.ts";
import { createListing, getListing } from "../controllers/listingControllers.ts";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser)
router.get("/profile", authenticate, getProfile)
router.post("/listings", authenticate, validateListing, createListing)
router.get("/listings", authenticate, getListing)

export default router