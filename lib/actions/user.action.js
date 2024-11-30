"use server";

import { editProfileSchema, updatePasswordSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getUserById } from "@/services/auth";
import { currentUser } from "../serverHooks";
import cloudinary from "@/lib/cloudinary";
import { extractPublicId } from "@/lib/extractPublicId";
import { update } from "@/auth";

export const updatePassword = async (values) => {
  console.log(values);
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  if (user.isOAuth) {
    values.currentPassword = undefined;
    values.newPassword = undefined;
  }

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

export const uploadImage = async (imageUrl) => {
  try {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };

    const dbUser = await getUserById(user.id);
    if (!dbUser) return { error: "User not found" };

    if (dbUser?.image) {
      const publicId = extractPublicId(dbUser?.image);
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl },
    });

    return { success: "Image uploaded successfully" };
  } catch (error) {
    return error;
  }
};

export const deleteImage = async () => {
  try {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };

    const dbUser = await getUserById(user.id);
    if (!dbUser) return { error: "User not found" };

    if (!dbUser?.image) {
      return { error: "User does not have an image" };
    }

    const publicId = extractPublicId(dbUser?.image);
    await cloudinary.uploader.destroy(publicId);

    await prisma.user.update({
      where: { id: user.id },
      data: { image: null },
    });

    return { success: "Image deleted successfully" };
  } catch (error) {
    return error;
  }
};

export const editProfile = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };

    const dbUser = await getUserById(user.id);
    if (!dbUser) return { error: "User not found" };

    const validateFields = editProfileSchema.safeParse(values);
    if (!validateFields.success) {
      return { error: validateFields.error || "Invalid data provided" };
    }

    const { isTwoFactorEnabled, name } = validateFields.data;

    if (user?.isOAuth) {
      values.isTwoFactorEnabled = undefined;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isTwoFactorEnabled, name },
    });

    return { success: "Profile updated successfully" };
  } catch (error) {
    return error;
  }
};
