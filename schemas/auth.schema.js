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

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is Required" }),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
