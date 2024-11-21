import * as z from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
