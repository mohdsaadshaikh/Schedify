"use server";
import { signIn, signOut } from "@/auth";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { getUserByEmail, getVerificationTokenByToken } from "@/services/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mails";
import { generateVerificationToken } from "@/services/generateTokens";

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

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email Sent" };
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

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      message:
        "Email verification required for login. Please check your inbox for a verification link.",
    };
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

export const verifyEmail = async (token) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid verification token" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();
  if (hasExpired) {
    return { error: "Verification token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "There is no user with this email" };
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verification successful" };
  } catch (error) {
    return { error: "An error occurred while verifying email" };
  }
};
