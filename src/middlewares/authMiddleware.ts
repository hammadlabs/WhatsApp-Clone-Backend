import type { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt.util";
import type { NextFunction, Request, Response } from "express";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  console.log("auth middleware runns");
  const token = req.headers.authorization;
  //Toke from header
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided or invalid" });
  }
  //Get only the token from the barer token
  const split = token.split(" ")[1];
  console.log(split);
  if (!split) {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  try {
    //Verify the token
    const decoded = await verifyAccessToken(split);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Forbidden - invalid expired token", error: error });
  }
};
