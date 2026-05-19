import type { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt.util";
import type { NextFunction, Request, Response } from "express";

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  console.log("auth middleware runns");
  const token = req.headers.authorization;
  //Toke from header
  if (!token) {
    return res.status(401).json({ success: false, message: "Melformed Token" });
  }
  try {
    const split = token.split(" ")[1];
    console.log(split);
    const decoded = verifyAccessToken(token);
    console.log("decoded token", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Forbidin _ invalid expired token" });
  }
};
