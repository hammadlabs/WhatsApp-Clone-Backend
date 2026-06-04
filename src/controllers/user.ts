import type { Request, Response } from "express";
import { findUserByEmail, getUserChats, createUserChat, getMessagesByChatId } from "../services/user.services";
interface ChatRouteParams {
  id: string;
}

export const UserProfile = async (req: Request, res: Response) => {
  console.log("user profile ", req.user);
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { email } = req.user; //user is comming from the middleware
  const user = await findUserByEmail({ email: email });
  return res.status(200).json({ success: true, user: user });
};
export const userConversations = async (req: Request, res: Response) => {
  const chats = await getUserChats({ userId: req.user?.id! });
  console.log(chats);
  return res.status(200).json({ result: chats });
};

export const openChat = async (req: Request<ChatRouteParams>, res: Response) => {
  try {
    const chatId: string = req.params.id;
    if (!chatId) {
      return res.status(401).json({ message: "Chat ID is required" });
    }
    const getMessages = await getMessagesByChatId({ id: chatId });
    console.log("Chat ID: ", chatId);
    res.status(200).json({ message: "Chat opened successfully", chatId: chatId, messages: getMessages });
  } catch (err) {}
};

export const newConversations = async (req: Request, res: Response) => {
  console.log("Add new Chat running");
  const { is_group, name, participents } = req.body;
  console.log("values", is_group, name, participents);
  const result = await createUserChat({ isGroup: is_group, name: name, participants: participents });
  return res.status(200).json({ messag: "working on it", result: result });
};
