import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
import { createAccessToken, createRefreshToken } from "../utils/jwt.util";
import {
  findUserByEmail,
  createNewUser,
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken,
} from "../services/user.services";

export const signup = async (req: Request, res: Response) => {
  try {
    const { user_name, user_email, user_password }: { user_name: string; user_email: string; user_password: string } =
      req.body;

    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ success: false, message: "Invalid Key Value Pair or empty fields" });
    }
    const user = await findUserByEmail({ email: user_email });

    if (!user) {
      //User password here
      const hashed = await hashPassword(user_password);
      const user = await createNewUser({ email: user_email, userName: user_name, password: hashed, role: "USER" });
      return res.status(200).json({
        success: true,
        message: "New User is created",
        user: { id: user.id, userName: user.user_name, email: user.email, role: user.role },
      });
    }
    return res.status(400).json({ success: false, message: "This User is already Registered" });
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
          token: refreshToken,
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
    console.log("Old Token received:", oldRefreshToken);

    // 1. Fixed Status Code to 401
    if (!oldRefreshToken) {
      return res.status(401).json({ success: false, message: "No refresh token found" });
    }

    const dbdata = await getRefreshToken(oldRefreshToken);
    if (!dbdata) {
      return res.status(403).json({ success: false, message: "This is not a valid token" });
    }
    console.log("got the user :", dbdata.userId);

    // 2. Generate the fresh token pairs
    const accessToken = await createAccessToken({ id: dbdata.userId });
    const rotatedRefreshToken = await createRefreshToken({ id: dbdata.userId });
    const tokenExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 3. Keep database actions together (Ideally wrap these two in a Prisma transaction inside your helpers)
    await deleteRefreshToken({ token: oldRefreshToken });

    await saveRefreshToken({
      token: rotatedRefreshToken, // ✅ FIXED: Saving the actual refresh token now
      userId: dbdata.userId,
      isRevoked: false,
      expiresAt: tokenExpiryDate,
    });

    // 4. FIXED: Setting the NEW rotated refresh token in the cookie with security flags
    res.cookie("refreshToken", rotatedRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return the short-lived access token to the frontend app memory
    return res.status(200).json({ success: true, token: accessToken });
  } catch (error) {
    console.error("Refresh Route Crash:", error);
    return res.status(500).json({ success: false, message: "An Internal Server error occurred" });
  }
};
