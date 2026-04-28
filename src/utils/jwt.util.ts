import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

//interface for payload

interface tokenPayload {
  id: string;
  email: string;
}

const jwtSecret = process.env.JWT_SECRET || "default_secret_key";

// Generate a Token
export const generateToken = (payload: tokenPayload, options: SignOptions = { expiresIn: "1h" }): string => {
  return jwt.sign(payload, jwtSecret, options);
};

//Verify a Token
export const verifyJwt = (token: string): tokenPayload => {
  return jwt.verify(token, jwtSecret) as tokenPayload;
};
