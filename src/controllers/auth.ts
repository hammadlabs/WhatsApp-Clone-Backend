import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import { generateToken } from "../utils/jwt.util";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, user_password }: { user_name: string; user_email: string; user_password: string } =
      req.body;
    console.log("Login/Signup Running | input Data =", user_name, user_email, user_password);
    if (user_name == undefined || user_email == undefined || user_password == undefined) {
      return res.status(400).json({ success: false, message: "Invlaid Key Value Pair" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });
    if (!user) {
      //Bcrypt User password here
      const hashed = await hashPassword(user_password);

      const user = await prisma.user.create({
        data: {
          email: user_email,
          password: hashed,
          user_name: user_name,
          role: "USER",
        },
      });
      return res.status(200).json({ success: true, message: "New User is created", user: user });
    } else {
      return res.status(400).json({ success: false, message: "This User is already Registered" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password }: { user_email: string; user_password: string } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "No user Exist" });
    } else {
      //check password
      const auth = await comparePassword(user_password, user.password);
      if (!auth) {
        return res.status(400).json({ success: false, message: "Email/Passowrd is incorrect" });
      } else {
        //Password Matched now - setup JWT
        const token = await generateToken({ id: user.id, email: user.email });
        return res
          .status(200)
          .cookie("token", token, { httpOnly: true, maxAge: 900000 })
          .json({ success: true, token: token });
      }
    }
  } catch (error) {
    console.log("error");
    res.send(501).json({ success: false, error: [error] });
  }
};
