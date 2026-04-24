import express from "express";
import type { Request, Response } from "express";
import { login, signup } from "../controllers/user";
const router = express.Router();

//Routes
router.get("/login", login);
router.post("/signup", signup);

export default router;
