"use server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/services/auth";
import { currentUser } from "../serverHooks";
import { createTaskSchema, editTaskSchema } from "@/schemas/task.schema";
import { endTimeFormatted, startTimeFormatted } from "../date";

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

  console.log(startTimeFormatted(startTime), endTimeFormatted(endTime));

  try {
    await prisma.task.create({
      data: {
        color,
        completed,
        date,
        description,
        priority,
        recurrence,
        endTime: endTimeFormatted(endTime),
        startTime: startTimeFormatted(startTime),
        title,
        userId: dbUser.id,
      },
    });

    return { success: "Task created successfully!" };
  } catch (error) {
    console.log(error);
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
      orderBy: {
        startTime: "asc",
      },
    });

    return tasks;
  } catch (error) {
    return error;
  }
};

export const editTask = async (values) => {
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  const validateFields = editTaskSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }

  const { id } = values;

  const {
    color,
    completed,
    description,
    endTime,
    priority,
    recurrence,
    startTime,
    title,
  } = validateFields.data;

  try {
    await prisma.task.update({
      where: { id, userId: dbUser.id },
      data: {
        color,
        completed,
        description,
        priority,
        recurrence,
        startTime: startTimeFormatted(startTime),
        endTime: endTimeFormatted(endTime),
        title,
      },
    });

    return { success: "Task updated successfully!" };
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (id) => {
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  try {
    await prisma.task.delete({
      where: { id, userId: dbUser.id },
    });

    return { success: "Task deleted successfully!" };
  } catch (error) {
    return error;
  }
};
