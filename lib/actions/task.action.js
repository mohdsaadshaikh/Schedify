"use server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/services/auth";
import { currentUser } from "../serverHooks";
import { createTaskSchema } from "@/schemas/task.schema";

export const createTask = async (values) => {
  console.log("Salam form the create Task Action", values);
  const user = await currentUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: "Not authenticated" };

  const validateFields = createTaskSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: validateFields.error || "Invalid data provided" };
  }
  console.log(validateFields.data);

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

  console.log(startTimeFormatted, endTimeFormatted);

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
    console.log(error);
    return error;
  }
};
