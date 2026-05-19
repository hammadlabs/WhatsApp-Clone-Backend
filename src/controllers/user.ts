import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const contacts = async (req: Request, res: Response) => {};

export const messages = async (req: Request, res: Response) => {};

export const UserProfile = async (req: Request, res: Response) => {
  console.log("user profile ", req.user);
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.user;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return res.status(200).json({ success: true, user: user });
};
