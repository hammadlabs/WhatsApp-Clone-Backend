import express from "express";
import type { Request, Response } from "express";
import { login, signup } from "../controllers/auth";
const router = express.Router();

//Routes
router.get("/login", login);
router.post("/signup", signup);
// router.post("/opt-varification", optVerification)

export default router;
