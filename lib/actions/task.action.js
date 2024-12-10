"use server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/services/auth";
import { currentUser } from "../serverHooks";
import { createTaskSchema } from "@/schemas/task.schema";

export const createTask = async (values) => {
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  const validateFields = createTaskSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }

  const {
    color,
    completed,
    description,
    endTime,
    priority,
    recurrence,
    startTime,
    title,
    date,
  } = validateFields.data;

  const startTimeFormatted = new Date(
    `${date.toISOString().split("T")[0]}T${startTime}`
  );
  const endTimeFormatted = new Date(
    `${date.toISOString().split("T")[0]}T${endTime}`
  );

  try {
    await prisma.task.create({
      data: {
        color,
        completed,
        date,
        description,
        priority,
        recurrence,
        endTime: endTimeFormatted,
        startTime: startTimeFormatted,
        title,
        userId: dbUser.id,
      },
    });

    return { success: "Task created successfully!" };
  } catch (error) {
    return error;
  }
};

export const getTasksByDate = async (date) => {
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: dbUser.id,
        date: new Date(date),
      },
    });

    return tasks;
  } catch (error) {
    return error;
  }
};
