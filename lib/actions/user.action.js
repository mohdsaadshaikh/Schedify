"use server";

import { auth } from "@/auth";
import { updatePasswordSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const updatePassword = async (values) => {
  const user = await currentUser();

  if (!user) return { error: "Not authenticated" };

  const validateFields = updatePasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }

  const { currentPassword, newPassword } = validateFields.data;
  if (currentPassword === newPassword) {
    return {
      error: "New password should not be the same as the previous one.",
    };
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) return { error: "Invalid current password" };

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: "Password updated successfully" };
  } catch (error) {
    return error;
  }
};
