import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/serverHooks";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("Headers received:", req.headers);
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date)
      return NextResponse.json({ error: "Date is required" }, { status: 400 });

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: dbUser.id,
        date: new Date(date),
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
