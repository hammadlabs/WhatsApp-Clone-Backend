import express from "express";
const router = express.Router();

//Import Controllers here
import { sendMsgToConversation } from "../controllers/chat";

router.post("/:id/new-message", sendMsgToConversation);

export default router;
