import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import { createAccessToken, createRefreshToken } from "../utils/jwt.util";
import { findUserByEmail, createNewUser, saveRefreshToken, getRefreshToken } from "../services/user.services";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, user_password }: { user_name: string; user_email: string; user_password: string } =
      req.body;

    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ success: false, message: "Invalid Key Value Pair" });
    }
    const user = findUserByEmail({ email: user_email });
    if (!user) {
      //User password here
      const hashed = await hashPassword(user_password);
      const user = createNewUser({ email: user_email, userName: user_name, password: hashed, role: "USER" });
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
    //Checking if the cookes exist or not
    const token = req.cookies.refreshToken;
    if (token) {
      //Check if the token is valid or not
      try {
        console.log(token);
        //cehck for refresh token in database and revoded ture or not
        const dbRefreshToken = await getRefreshToken({ token: token });
        console.log("Db refresh token", dbRefreshToken);
      } catch (error) {
        return res.status(400).json({ success: false, message: "User is already loged in" });
      }
    }
    const user = await findUserByEmail({ email: user_email });
    if (!user) {
      return res.status(400).json({ success: false, message: "No user Exist" });
    } else {
      //check password
      const auth = await comparePassword(user_password, user.password);
      if (!auth) {
        return res.status(400).json({ success: false, message: "Email/Passowrd is incorrect" });
      } else {
        //Password Matched now - setup JWT
        const token = await createAccessToken({ id: user.id });
        const refreshToken = await createRefreshToken({ id: user.id });
        const tokenExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        //Saving refreshToken in the database
        const rToken = await saveRefreshToken({
          token: token,
          userId: user.id,
          isRevoked: false,
          expiresAt: tokenExpiryDate,
        });
        res.cookie("refreshToken", refreshToken);
        return res.status(200).json({ success: true, token: token });
      }
    }
  } catch (error) {
    console.log("error");
    res.status(501).json({ success: false, error: [error] });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "User must be login firt to logout" });
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      path: "/",
    });
    return res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      return res.status(404).json({ messages: "No Token found for this User" });
    }
    const dbRefreshToken = await prisma.userRefreshToken.findUnique({
      where: { token: oldRefreshToken },
      include: { user: true },
    });
    console.log(dbRefreshToken);
    return res.status(200).json({ message: "new refresh token generated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: [error] });
  }
};
