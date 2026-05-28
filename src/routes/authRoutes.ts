import express from "express";
import type { Request, Response } from "express";
import { signup, login, logout, refreshToken } from "../controllers/auth";
const router = express.Router();
import { loginSchema } from "../validations/auth.validation";
import { validate } from "../middlewares/authMiddleware";

//Routes
router.post("/signup", signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/refresh-token", refreshToken);

export default router;
