import { Priority, Recurrence } from "@prisma/client";
import * as z from "zod";
export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title must be at least 1 character"),
    description: z
      .string()
      .max(100, "Description must not exceed 100 characters"),
    startTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    endTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    date: z.date(),
    recurrence: z.enum(Object.values(Recurrence), {
      errorMap: () => {
        return { message: "Recurrence is required" };
      },
    }),
    color: z.string().optional(),
    priority: z.enum(Object.values(Priority), {
      errorMap: () => {
        return { message: "Priority is required" };
      },
    }),
    completed: z.boolean().optional().default(false),
    notifyMe: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      const startDate = new Date(1970, 0, 1, startHours, startMinutes);
      const endDate = new Date(1970, 0, 1, endHours, endMinutes);

      return endDate > startDate;
    },
    {
      message: "End time must be after the start time",
      path: ["endTime"],
    }
  );

export const editTaskSchema = z
  .object({
    title: z.string().min(1, "Title must be at least 1 character"),
    description: z
      .string()
      .max(100, "Description must not exceed 100 characters")
      .optional(),
    startTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    endTime: z
      .string()
      .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    date: z.date(),
    recurrence: z.enum(Object.values(Recurrence), {
      errorMap: () => {
        return { message: "Recurrence is required" };
      },
    }),
    priority: z.enum(Object.values(Priority), {
      errorMap: () => {
        return { message: "Priority is required" };
      },
    }),
    color: z.string().optional(),
    completed: z.boolean().optional(),
    notifyMe: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      const startDate = new Date(1970, 0, 1, startHours, startMinutes);
      const endDate = new Date(1970, 0, 1, endHours, endMinutes);

      return endDate > startDate;
    },
    {
      message: "End time must be after the start time",
      path: ["endTime"],
    }
  );
