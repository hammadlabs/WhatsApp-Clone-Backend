import express from "express";
import type { Request, Response } from "express";
import { contacts, messages, UserProfile } from "../controllers/user";
const router = express.Router();

//Routes
router.post("/contacts", contacts);
router.post("/messages", messages);
router.get("/profile", UserProfile);

export default router;
