import express from "express";
import type { Request, Response } from "express";
import { contacts, messages, UserProfile } from "../controllers/user";
const router = express.Router();

//Routes
router.get("/contacts", contacts);
router.get("/chats", messages);
router.get("/profile", UserProfile);

export default router;
