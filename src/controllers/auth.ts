import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    console.log("login running");
    const { country_code, phone_number }: { country_code: string; phone_number: string } = req.body;
    console.log("input Data ", country_code, phone_number);
    const user = await prisma.user.findMany({
      where: {
        phone_number: country_code + phone_number,
        country_code: country_code,
      },
    });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    console.log("singup running");
    const { country_code, phone_number }: { country_code: string; phone_number: string } = req.body;
    console.log("input Data ", country_code, phone_number);
    const user = await prisma.user.create({
      data: {
        phone_number: country_code + phone_number,
        country_code: country_code,
      },
    });
    res.status(200).json({ success: true, user: user });
  } catch (error: any) {
    if (error.code === "P2002") {
      console.log("Unique Key Constrains Error");
      res.status(409).json({ success: false, error: "This Number Already Exist" });
    }
    console.error(error);
    res.status(500).json({ success: false, error: [error] });
  }
};

export const optVerification = async (req: Request, res: Response) => {
  try {
    const { otpCode }: { otpCode: string } = req.body;
  } catch (error) {}
};
