import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// This is the API route handler for cron job
export async function POST(req) {
  console.log("Cron job API hit at:", new Date());

  try {
    const recurringTasks = await prisma.task.findMany({
      where: {
        NOT: { recurrence: "NONE" },
      },
    });

    for (const task of recurringTasks) {
      const {
        recurrence,
        startTime,
        endTime,
        date,
        userId,
        title,
        description,
        color,
        priority,
      } = task;

      let newDate = new Date(date);

      switch (recurrence) {
        case "DAILY":
          newDate.setMinutes(newDate.getMinutes() + 1);
          break;
        case "WEEKLY":
          newDate.setDate(newDate.getDate() + 7);
          break;
        case "MONTHLY":
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case "YEARLY":
          newDate.setFullYear(newDate.getFullYear() + 1);
          break;
      }

      // Prevent duplicate task creation
      const existingTask = await prisma.task.findFirst({
        where: {
          title,
          date: newDate,
          userId,
        },
      });

      if (!existingTask) {
        await prisma.task.create({
          data: {
            title,
            description,
            startTime,
            endTime,
            date: newDate,
            recurrence,
            color,
            priority,
            userId,
            completed: false,
          },
        });
        console.log(`New task created for user ${userId} on date ${newDate}`);
      }
    }

    return NextResponse.json({ message: "Cron job executed successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
