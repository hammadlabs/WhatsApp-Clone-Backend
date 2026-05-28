import type { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt.util";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

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

/**
 * Reusable wrapper that accepts a Zod schema and returns an Express middleware
 */
export const validate = (schema: z.ZodTypeAny) => {
  // This inner function is what Express actually runs when a login request hits the server
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "fail",
        message: "Validation Error",
        errors: result.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Replace the request body with the strictly parsed, clean data
    req.body = result.data;

    // Crucial: Tells Express to move forward to your login controller!
    return next();
  };
};
