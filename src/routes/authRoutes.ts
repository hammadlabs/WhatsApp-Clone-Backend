import express from "express";
import type { Request, Response } from "express";
import { signup, login, logout, refreshToken } from "../controllers/auth";
const router = express.Router();

//Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh-token", refreshToken);

export default router;
