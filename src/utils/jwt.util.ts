import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

//interface for payload

interface tokenPayload {
  id: string;
  phone_number: string;
  role: string;
}

const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
const options: SignOptions = { expiresIn: "1h" };

// Generate a Token
export const generateToken = (payload: tokenPayload, options: SignOptions): string => {
  return jwt.sign(payload, jwtSecret, options);
};

//Verify a Token
export const verifyJwt = (token: string): tokenPayload => {
  return jwt.verify(token, jwtSecret) as tokenPayload;
};
