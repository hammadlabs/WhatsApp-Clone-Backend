import { z } from "zod";

export const loginSchema = z
  .object({
    user_email: z.string().min(1, "Email is required").email("Invalid email format"),
    user_password: z.string().min(8, "password Must be at least 8 characters long"),
  })
  .strict();

export const signupSchema = z.object({
  user_name: z
    .string()
    .min(1, "Name is required")
    .max(60, "No more than 60 Characters allowed")
    .regex(
      /^[a-zA-Z][a-zA-Z0-9]{2,15}$/,
      "Username must start with letter and contain numbers also and 3-16 characters long",
    ),
  user_email: z
    .string()
    .min(1, "Email is required")
    .max(120, "No more than 120 Characters allowed")
    .email("Invalid email format"),
  user_password: z.string().min(8, "Minimum password length must be 8 Characters"),
});
