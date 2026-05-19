import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

//interface for payload

interface tokenPayload {
  id: string;
}

const secret_access = process.env.JWT_ACCESS || "default_secret_key";
const secret_refresh = process.env.JWT_REFRESH || "default_refresh_secret_key";

// Generate Access Token
export const createAccessToken = (payload: tokenPayload, options: SignOptions = { expiresIn: "15m" }): string => {
  return jwt.sign(payload, secret_access, options);
};
// Generate Refresh Token
export const createRefreshToken = (payload: tokenPayload, options: SignOptions = { expiresIn: "7d" }): string => {
  return jwt.sign(payload, secret_refresh, options);
};

//Verify a Token
export const verifyAccessToken = (token: string): tokenPayload => {
  return jwt.verify(token, secret_access) as tokenPayload;
};

export const verifyRefreshToken = (token: string): tokenPayload => {
  return jwt.verify(token, secret_refresh) as tokenPayload;
};
