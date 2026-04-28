import type { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../utils/jwt.util";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  //Auth Headers checking
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }
  //Toke from header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Melformed Token" });
  }
  try {
    const decoded = verifyJwt(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Forbidin _ invalid expired token" });
  }
};
