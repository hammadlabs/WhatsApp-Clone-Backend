import bcrypt from "bcryptjs";
const salt: number = 10;

export const hashPassword = async (plainpassword: string): Promise<string> => {
  return await bcrypt.hash(plainpassword, salt);
};

export const comparePassword = async (plainpassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainpassword, hashedPassword);
};
