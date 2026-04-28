import crypto from "crypto";
export const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
