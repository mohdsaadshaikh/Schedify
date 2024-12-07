import { Priority, Recurrence } from "@prisma/client";
import * as z from "zod";

export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title must be at least 1 character"),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters"),
    category: z.string().min(1, "Category must be at least 1 character"),
    startTime: z.date().min(new Date(), "Start time must be in the future"),
    endTime: z.date(),
    isRepeating: z.boolean(),
    recurrence: z.enum(Object.values(Recurrence)),
    color: z.string().optional(),
    priority: z.enum(Object.values(Priority)),
    completed: z.boolean().optional().default(false),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after the start time",
    path: ["endTime"],
  });
