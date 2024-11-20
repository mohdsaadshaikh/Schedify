"use server";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/auth.schema";
import { getUserByEmail } from "@/services/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const login = async (values) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }

  const matchPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchPassword) {
    return { error: "Invalid password" };
  }

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      return { error: res.error.message };
    }
    return {
      success: "Successfully LoggedIn",
      redirect: DEFAULT_LOGIN_REDIRECT,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "CallbackRouteError":
          return { error: "Invalid callback route" };
        default:
          return { error: "An error occurred " };
      }
    }
    throw error;
  }
};
