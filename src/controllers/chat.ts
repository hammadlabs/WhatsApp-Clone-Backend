import type { Request, Response } from "express";
export const sendMsgToConversation = async (req: Request, res: Response) => {
  console.log("Send a chat to a conversation");
  res.status(200).json({ status: "success", data: req.body });
  console.log("Data", req.body.sender, req.body.message);
};
