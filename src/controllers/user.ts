import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const login = async (req: Request, res: Response) => {
  try {
    console.log("login running");
    const { country_code, phone_number } = req.body;
    console.log("input Data ", country_code, phone_number);
    const user = await prisma.user.findMany({
      where: {
        phone_number: phone_number,
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
    const { country_code, phone_number } = req.body;
    console.log("input Data ", country_code, phone_number);
    const user = await prisma.user.create({
      data: {
        phone_number: phone_number,
        country_code: country_code,
      },
    });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: [error] });
  }
};
