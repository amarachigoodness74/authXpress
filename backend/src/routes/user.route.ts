import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

// Single user route
router.get("/:id", register);

export default router;
