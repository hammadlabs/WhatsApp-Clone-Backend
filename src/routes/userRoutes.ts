import express from "express";
import type { Request, Response } from "express";
import { openChat, userConversations, UserProfile, newConversations } from "../controllers/user";
const router = express.Router();

//Routes
router.get("/chat/:id/messages", openChat);
router.get("/chats", userConversations); //Getting old conersations
router.post("/chats", newConversations); //creating new conversations
router.get("/profile", UserProfile);

export default router;
