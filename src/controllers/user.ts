import type { Request, Response } from "express";
import { findUserByEmail } from "../services/user.services";

export const UserProfile = async (req: Request, res: Response) => {
  console.log("user profile ", req.user);
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { email } = req.user; //user is comming from the middleware
  const user = await findUserByEmail({ email: email });
  return res.status(200).json({ success: true, user: user });
};
export const contacts = async (req: Request, res: Response) => {};

export const messages = async (req: Request, res: Response) => {};
