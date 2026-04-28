import express from "express";
import type { Request, Response } from "express";
import { signup, login } from "../controllers/auth";
const router = express.Router();

//Routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
