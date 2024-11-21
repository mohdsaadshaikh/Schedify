"use server";
import { signIn, signOut } from "@/auth";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { getUserByEmail } from "@/services/auth";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import bcrypt from "bcryptjs";

export const register = async (values) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }

  const { name, email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return { success: "Registration successful" };
  } catch (error) {
    return { error: "An error occurred while registering" };
  }
};

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
    if (res?.error) {
      return { error: res.error };
    }

    return { success: "Successfully LoggedIn" };
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

export const logout = async () => {
  await signOut({ redirect: false });
};
