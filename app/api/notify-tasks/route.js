import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron job started at:", new Date());

  try {
    const now = new Date();

    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toISOString().split("T")[1].split(".")[0];

    const futureTime = new Date(now.getTime() + 5 * 60 * 1000);
    const futureTimeString = futureTime
      .toISOString()
      .split("T")[1]
      .split(".")[0];

    const tasksToNotify = await prisma.task.findMany({
      where: {
        date: new Date(currentDate),
        startTime: {
          gte: `${currentDate}T${currentTime}Z`,
          lte: `${currentDate}T${futureTimeString}Z`,
        },
        isNotified: false,
        notifyMe: true,
        completed: false,
      },
    });

    console.log(tasksToNotify);

    if (tasksToNotify.length) {
      const notifications = tasksToNotify.map((task) => ({
        taskId: task.id,
        userId: task.userId,
        message: `Your task "${task.title}" is starting now!`,
      }));

      await prisma.notification.createMany({
        data: notifications,
      });

      const taskIds = tasksToNotify.map((task) => task.id);
      await prisma.task.updateMany({
        where: { id: { in: taskIds } },
        data: { isNotified: true },
      });
    } else {
      console.log("No tasks to notify at this time.");
    }

    return NextResponse.json({ success: true, message: "Cron job executed" });
  } catch (error) {
    console.error("Error creating notifications:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
