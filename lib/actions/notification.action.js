"use server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/services/auth";
import { currentUser } from "../serverHooks";

export const getAllNotifications = async () => {
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: { sentAt: "desc" },
    });
    return notifications;
  } catch (error) {
    return { error: error.message };
  }
};
